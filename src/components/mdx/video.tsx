import AutoplayVideo from "../autoplay-video";
import { videoType } from "@/lib/video";

const className =
  "w-full bg-white/5 rounded-lg backdrop-blur-md overflow-hidden";

export default function Video({
  src,
  controls,
  poster,
}: {
  src: string[];
  // For full-length videos, like talks: shows the player controls and only
  // loads the video when it's played, instead of autoplaying it on a loop
  controls?: boolean;
  poster?: string;
}) {
  if (!controls) {
    return <AutoplayVideo src={src} poster={poster} className={className} />;
  }

  return (
    <video
      className={className}
      controls
      preload="metadata"
      poster={poster}
      playsInline
    >
      {src.map((source) => (
        <source key={source} src={source} type={videoType(source)} />
      ))}
    </video>
  );
}
