"use client";

import Image from "next/legacy/image";
import { ComponentProps, useState } from "react";
import clsx from "clsx";

interface CardImageProps extends ComponentProps<"div"> {
  className?: string;
  radius?: string;
  src: string;
  alt: string;
}

const CardImage = ({ src, alt, className, radius = "2xl" }: CardImageProps) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <div className={clsx("relative size-full -z-20", className)}>
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="cover"
        className={clsx("opacity-80", `rounded-${radius}`)}
        onLoad={() => setIsLoaded(true)}
      />
      <div
        className={clsx(
          "absolute size-full bg-gradient-to-br from-white/10 to-transparent backdrop-blur-[0.3px]",
          `rounded-${radius}`,
          !isLoaded && "animate-pulse",
        )}
      />
    </div>
  );
};

export default CardImage;
