import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import sharp from "sharp";

const escapeXml = (str: string) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

// Title metrics, in og-template.svg units
const TITLE_FONT = "PP Editorial New";
const TITLE_FONT_SIZE = 53.0552;
const TITLE_WRAPPED_FONT_SIZE = TITLE_FONT_SIZE * 0.8;
const TITLE_LINE_HEIGHT = 1.1;
const TITLE_MAX_WIDTH = 700; // Keeps the title clear of the white shape on the right

// Cover background effects, so text in the cover doesn't compete with the title
const COVER_BRIGHTNESS = 0.9;
const COVER_BLUR_SIGMA = 12;
// Full blur behind the title and description, fading out towards the top
const COVER_BLUR_MASK = Buffer.from(
  `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <linearGradient id="mask" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0.15" stop-color="#fff" />
      <stop offset="0.75" stop-color="#fff" stop-opacity="0" />
    </linearGradient>
    <rect width="1200" height="630" fill="url(#mask)" />
  </svg>`,
);

// Renders the text with Pango (the same text engine the SVG uses) to get its width
const measureTitle = async (text: string, fontSize: number) => {
  const { width = 0 } = await sharp({
    text: { text: escapeXml(text), font: `${TITLE_FONT} ${fontSize}` },
  }).metadata();
  return width;
};

// Titles that don't fit get a smaller font and are split into two balanced lines
const layoutTitle = async (title: string) => {
  if ((await measureTitle(title, TITLE_FONT_SIZE)) <= TITLE_MAX_WIDTH) {
    return { lines: [title], fontSize: TITLE_FONT_SIZE };
  }

  const words = title.split(" ");
  let lines = [title];
  let width = await measureTitle(title, TITLE_WRAPPED_FONT_SIZE);
  for (let i = 1; i < words.length; i++) {
    const candidate = [words.slice(0, i).join(" "), words.slice(i).join(" ")];
    const candidateWidth = Math.max(
      ...(await Promise.all(
        candidate.map((line) => measureTitle(line, TITLE_WRAPPED_FONT_SIZE)),
      )),
    );
    if (candidateWidth < width) {
      lines = candidate;
      width = candidateWidth;
    }
  }

  // Shrink further if even the widest line doesn't fit
  const fontSize = Math.min(
    TITLE_WRAPPED_FONT_SIZE,
    (TITLE_WRAPPED_FONT_SIZE * TITLE_MAX_WIDTH) / width,
  );
  return { lines, fontSize };
};

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const title = searchParams.get("title") || "Diogo Matos";
  const description = searchParams.get("description") || "diogogmatos.dev";
  const image = searchParams.get("image");

  try {
    // 1. Load your raw SVG template
    const filePath = path.join(process.cwd(), "public", "og-template.svg");
    let svgString = fs.readFileSync(filePath, "utf8");

    // 2. Inject your dynamic text. The title's last line sits on the template's
    //    baseline and any extra line goes above it
    const { lines, fontSize } = await layoutTitle(title);
    const titleX = svgString.match(
      /x="([^"]+)"[^>]*>\{\{DYNAMIC_TITLE\}\}/,
    )?.[1];
    const lineHeight = fontSize * TITLE_LINE_HEIGHT;
    const titleLines = lines
      .map(
        (line, i) =>
          `<tspan x="${titleX}" dy="${i === 0 ? -(lines.length - 1) * lineHeight : lineHeight}" style="font-size:${fontSize}px">${escapeXml(line)}</tspan>`,
      )
      .join("");
    svgString = svgString.replace("{{DYNAMIC_TITLE}}", titleLines);
    svgString = svgString.replace(
      "{{DYNAMIC_DESCRIPTION}}",
      escapeXml(description),
    );

    // 3. Replace the background image, if one was given (same origin only).
    //    It's fetched over HTTP instead of read from disk so the serverless
    //    function doesn't need to bundle the public assets.
    if (image) {
      const imageUrl = new URL(image, origin);
      if (imageUrl.origin !== origin) {
        return new NextResponse("Invalid image", { status: 400 });
      }

      const imageResponse = await fetch(imageUrl);
      if (!imageResponse.ok) {
        return new NextResponse("Image not found", { status: 404 });
      }

      const coverBuffer = await sharp(
        Buffer.from(await imageResponse.arrayBuffer()),
      )
        .resize(1200, 630, { fit: "cover" })
        .modulate({ brightness: COVER_BRIGHTNESS })
        .png()
        .toBuffer();
      const fadedBlurBuffer = await sharp(coverBuffer)
        .blur(COVER_BLUR_SIGMA)
        .ensureAlpha()
        .composite([{ input: COVER_BLUR_MASK, blend: "dest-in" }])
        .png()
        .toBuffer();
      const backgroundBuffer = await sharp(coverBuffer)
        .composite([{ input: fadedBlurBuffer }])
        .jpeg({ quality: 90 })
        .toBuffer();

      svgString = svgString.replace(
        /xlink:href="data:image\/[^;]+;base64,[^"]*"/,
        `xlink:href="data:image/jpeg;base64,${backgroundBuffer.toString("base64")}"`,
      );
    }

    // 4. Convert SVG string to Buffer and process with Sharp
    const jpgBuffer = await sharp(Buffer.from(svgString))
      .resize(1200, 630) // Standard OG size
      .jpeg({ quality: 90 }) // Convert to JPG with 90% quality
      .toBuffer();

    // 5. Return the binary JPG data
    return new NextResponse(new Uint8Array(jpgBuffer), {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Image generation failed:", error);
    return new NextResponse("Error generating image", { status: 500 });
  }
}
