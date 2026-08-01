import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import sharp from "sharp";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Diogo Matos";
  const description = searchParams.get("description") || "diogogmatos.dev";

  try {
    // 1. Load your raw SVG template
    const filePath = path.join(process.cwd(), "public", "og-template.svg");
    let svgString = fs.readFileSync(filePath, "utf8");

    // 2. Inject your dynamic text
    svgString = svgString.replace("{{DYNAMIC_TITLE}}", title);
    svgString = svgString.replace("{{DYNAMIC_DESCRIPTION}}", description);

    // 3. Convert SVG string to Buffer and process with Sharp
    const jpgBuffer = await sharp(Buffer.from(svgString))
      .resize(1200, 630) // Standard OG size
      .jpeg({ quality: 90 }) // Convert to JPG with 90% quality
      .toBuffer();

    // 4. Return the binary JPG data
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
