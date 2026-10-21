import { cn } from "@/lib/utils";
import Image from "next/image";

// For phone mockups and other images with a transparent background. Regular
// screenshots side by side go in a Markdown table instead
export default function ContainedImage({
  src,
  alt,
  addPadding,
  cover,
  priority,
  className,
}: {
  src: string[];
  alt: string;
  addPadding?: boolean;
  cover?: boolean;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex size-full bg-white/5 gap-3 rounded-lg backdrop-blur-md overflow-hidden h-[360px] my-6",
        addPadding && "p-3 sm:p-5",
        className,
      )}
    >
      {src.map((source, idx) => (
        <Image
          key={idx}
          // flex-1 and min-w-0 split the width evenly between images, instead
          // of the first one taking it all and pushing the others out of view
          className={cn(
            cover ? "object-cover" : "object-contain",
            "size-full min-w-0 flex-1",
          )}
          src={source}
          alt={alt}
          width={500}
          height={500}
          priority={priority}
        />
      ))}
    </div>
  );
}
