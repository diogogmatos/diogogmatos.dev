// A video's MIME type by its file name, so the browser can tell whether it plays that format.
// The codecs cover how scripts/encode-video.sh encodes them, up to 1080p at 60fps, with H.265
// tagged as hvc1, the only tag Safari plays
export function videoType(source: string) {
  if (source.endsWith(".webm")) return 'video/webm; codecs="vp9"';
  if (source.includes("h265")) return 'video/mp4; codecs="hvc1.1.6.L123.90"';
  return 'video/mp4; codecs="avc1.64002A"';
}
