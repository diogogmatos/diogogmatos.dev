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
  return (
    <video
      className={
        "w-full bg-white/5 rounded-lg backdrop-blur-md overflow-hidden"
      }
      autoPlay={!controls}
      loop={!controls}
      muted={!controls}
      controls={controls}
      preload={controls ? "metadata" : undefined}
      poster={poster}
      playsInline
    >
      {src.map((source, idx) => (
        <source
          key={idx}
          src={source}
          type={`video/${source.split(".").pop()}; codecs=${
            source.includes("webm")
              ? "vp9"
              : source.includes("h265")
                ? "hevc"
                : "avc"
          }`}
        />
      ))}
    </video>
  );
}
