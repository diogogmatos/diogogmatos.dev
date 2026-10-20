import { cn } from "@/lib/utils";
import Image from "next/image";

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
        "flex size-full bg-white/5 rounded-lg backdrop-blur-md overflow-hidden h-[360px] my-6",
        addPadding && "p-3 sm:p-5",
        className,
      )}
    >
      {src.map((source, idx) => (
        <Image
          key={idx}
          className={cn(cover ? "object-cover" : "object-contain", "size-full")}
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
