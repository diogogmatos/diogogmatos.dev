"use client";

import { useEffect, useRef } from "react";
import { videoType } from "@/lib/video";

// How much of the video has to be on screen for it to play
const VISIBLE = 0.25;

// A muted video on a loop that only plays while it's on screen, so not while it's on a carousel
// slide that isn't showing. It's downloaded the first time it shows up and let go of when it leaves
// the page, since a few videos playing at once is enough to run phones out of memory
export default function AutoplayVideo({
  src,
  poster,
  dimensions,
  className,
}: {
  // The same video in several formats, from the one to use first
  src: string[];
  // Shown until it plays, and gives it its size before it's downloaded
  poster?: string;
  // Its size, so it takes up the right space before the poster loads too. Going back to a page
  // makes it load again, and it'd have the browser's default size until then, making the page jump
  dimensions?: { width: number; height: number };
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    // Safari hides the poster as soon as play() is called, and shows nothing until the video has
    // a frame. So the poster is also its background, fitted the same way, to show through until then
    if (poster) {
      const { objectFit, objectPosition } = getComputedStyle(video);
      const sizes: Record<string, string> = {
        cover: "cover",
        fill: "100% 100%",
        none: "auto",
      };
      Object.assign(video.style, {
        backgroundImage: `url("${poster}")`,
        backgroundSize: sizes[objectFit] ?? "contain",
        backgroundPosition: objectPosition,
        backgroundRepeat: "no-repeat",
        backgroundOrigin: "content-box",
      });
    }

    // Picked here instead of with <source> elements, since those can't be unloaded
    const formats = src.filter((source) =>
      video.canPlayType(videoType(source)),
    );
    let format = -1;
    const load = () => {
      if (++format < formats.length) video.src = formats[format];
    };
    let visible = false;
    // Only once it knows the video's size, since Safari hides the poster when it's called, and it'd
    // shrink to the default size until then, making the page jump. Rejected when it's paused again
    // before it starts, which is fine
    const play = () => {
      if (visible && video.readyState >= HTMLMediaElement.HAVE_METADATA)
        video.play().catch(() => {});
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.intersectionRatio >= VISIBLE;
        if (!visible) return video.pause();
        if (format < 0) load();
        play();
      },
      { threshold: VISIBLE },
    );

    // Moves on to the next format if one doesn't load
    video.addEventListener("error", load);
    video.addEventListener("loadedmetadata", play);
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.removeEventListener("error", load);
      video.removeEventListener("loadedmetadata", play);
      // Frees the downloaded video and what playing it took up
      video.removeAttribute("src");
      video.load();
    };
  }, [src, poster]);

  return (
    <video
      ref={ref}
      poster={poster}
      className={className}
      style={
        dimensions && {
          aspectRatio: `${dimensions.width} / ${dimensions.height}`,
        }
      }
      muted
      loop
      playsInline
      // Nothing loads before it shows up, since there's no src until then. Then it gets the
      // video's size first, which it waits for to play
      preload="metadata"
    />
  );
}
