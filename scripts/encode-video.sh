#!/usr/bin/env bash
# Makes a video ready for the website, encoded the same way as the ones already on it: the
# video as H.265, VP9 (WebM) and H.264, so every browser has one it can play, plus a poster
# of its first frame to show until it does.
#
# Usage: scripts/encode-video.sh [options] <input> <output>
#
#   <input>   The original video, in any format ffmpeg reads
#   <output>  Where the files go, without an extension. For public/assets/grafit/showcase it
#             makes showcase_h265.mp4, showcase.webm, showcase_h264.mp4 and showcase-poster.webp
#
# Options:
#   -r, --resolution 720|1080  The height for landscape videos, or the width for portrait
#                              ones (720 by default). Videos smaller than that keep their size
#   --audio                    Keeps the audio, for videos with controls like talks. It's left
#                              out otherwise, since videos that play by themselves are muted
#   --only <formats>           Only makes some of the files, separated by commas, out of
#                              h265, webm, h264 and poster. Like to add a format that's missing
#   -h, --help                 Shows this
set -euo pipefail

usage() {
  sed -n '2,/^[^#]/s/^# \{0,1\}//p' "$0"
  exit "${1:-0}"
}

resolution=720
audio=false
everything=h265,webm,h264,poster
only=$everything
paths=()
while [[ $# -gt 0 ]]; do
  case $1 in
    -r | --resolution) resolution=${2:-}; shift 2 ;;
    --audio) audio=true; shift ;;
    --only) only=${2:-}; shift 2 ;;
    -h | --help) usage ;;
    -*) echo "Unknown option $1" >&2; usage 1 ;;
    *) paths+=("$1"); shift ;;
  esac
done
[[ ${#paths[@]} -eq 2 ]] || usage 1
input=${paths[0]}
output=${paths[1]}

[[ $resolution == 720 || $resolution == 1080 ]] || { echo "The resolution has to be 720 or 1080" >&2; exit 1; }
[[ -f $input ]] || { echo "Can't find $input" >&2; exit 1; }
for format in ${only//,/ }; do
  [[ $format =~ ^(h265|webm|h264|poster)$ ]] || { echo "Unknown format $format" >&2; exit 1; }
done
command -v ffmpeg >/dev/null || { echo "This needs ffmpeg" >&2; exit 1; }
mkdir -p "$(dirname "$output")"

# Scales the shorter side down to the resolution, worked out by ffmpeg after it applies the
# rotation phones save videos with. Sizes stay even, which H.264 and H.265 need
scale="scale='if(gte(iw,ih),-2,min($resolution,trunc(iw/2)*2))':'if(gte(iw,ih),min($resolution,trunc(ih/2)*2),-2)':flags=lanczos"
# Capped at 60fps, with H.264 also held to level 4.2, so they stay within the codecs that
# src/lib/video.ts tells browsers to expect
video=(-vf "$scale" -pix_fmt yuv420p -fpsmax 60)
if $audio; then
  mp4_audio=(-c:a aac -b:a 128k)
  webm_audio=(-c:a libopus -b:a 96k)
else
  mp4_audio=(-an)
  webm_audio=(-an)
fi

# Every file is made at the same time, and the script fails if any of them does
pids=()
files=()
encode() {
  echo "Making $1"
  files+=("$1")
  shift
  ffmpeg -v error -y -i "$input" "$@" &
  pids+=($!)
}
wants() { [[ ,$only, == *,$1,* ]]; }

wants h265 && encode "${output}_h265.mp4" "${video[@]}" -c:v libx265 -preset slow -crf 26 -tag:v hvc1 \
  -x265-params log-level=error "${mp4_audio[@]}" -movflags +faststart "${output}_h265.mp4"
wants webm && encode "${output}.webm" "${video[@]}" -c:v libvpx-vp9 -crf 33 -b:v 0 -row-mt 1 \
  -deadline good -cpu-used 2 "${webm_audio[@]}" "${output}.webm"
wants h264 && encode "${output}_h264.mp4" "${video[@]}" -c:v libx264 -preset slow -crf 23 \
  -profile:v high -level:v 4.2 "${mp4_audio[@]}" -movflags +faststart "${output}_h264.mp4"
wants poster && encode "${output}-poster.webp" -frames:v 1 -vf "$scale" -c:v libwebp -quality 85 \
  "${output}-poster.webp"

failed=false
for pid in "${pids[@]}"; do wait "$pid" || failed=true; done
$failed && { echo "Some of them couldn't be made" >&2; exit 1; }

echo
du -h "${files[@]}"

# What to write in a project's JSON file or a post, when it made all of them in public/
if [[ $only == "$everything" && $output == *public/* ]]; then
  path=/${output#*public/}
  echo
  echo "In a project's media:"
  echo "  \"src\": [\"${path}_h265.mp4\", \"${path}.webm\", \"${path}_h264.mp4\"],"
  echo "  \"poster\": \"${path}-poster.webp\","
  echo
  echo "In a post:"
  echo "  <Video src={[\"${path}_h265.mp4\", \"${path}.webm\", \"${path}_h264.mp4\"]} poster=\"${path}-poster.webp\" />"
fi
