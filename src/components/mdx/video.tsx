export default function Video({ src }: { src: string[] }) {
  return (
    <video
      className={
        "w-full bg-white/5 rounded-lg backdrop-blur-md overflow-hidden"
      }
      autoPlay
      loop
      muted
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
