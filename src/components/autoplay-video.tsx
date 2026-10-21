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
  className,
}: {
  // The same video in several formats, from the one to use first
  src: string[];
  // Shown until it plays, and gives it its size before it's downloaded
  poster?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    // Picked here instead of with <source> elements, since those can't be unloaded
    const formats = src.filter((source) => video.canPlayType(videoType(source)));
    let format = -1;
    const load = () => {
      if (++format < formats.length) video.src = formats[format];
    };
    // Rejected when it's paused again before it starts, which is fine
    const play = () => video.play().catch(() => {});
    // Moves on to the next format if one doesn't load
    const onError = () => {
      load();
      play();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < VISIBLE) return video.pause();
        if (format < 0) load();
        play();
      },
      { threshold: VISIBLE },
    );

    video.addEventListener("error", onError);
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.removeEventListener("error", onError);
      // Frees the downloaded video and what playing it took up
      video.removeAttribute("src");
      video.load();
    };
  }, [src]);

  return (
    <video
      ref={ref}
      poster={poster}
      className={className}
      muted
      loop
      playsInline
      preload="none"
    />
  );
}
