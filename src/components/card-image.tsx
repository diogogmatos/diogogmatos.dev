"use client";

import Image from "next/legacy/image";
import { ComponentProps, useState } from "react";

interface CardImageProps extends ComponentProps<"div"> {
  className?: string;
  src: string;
  alt: string;
}

const CardImage = ({ src, alt, className }: CardImageProps) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <div className={`relative size-full -z-20 ${className}`}>
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="cover"
        className="rounded-2xl opacity-80"
        onLoad={() => setIsLoaded(true)}
      />
      <div
        className={`absolute size-full bg-gradient-to-br from-white/10 to-transparent rounded-2xl backdrop-blur-[0.3px] ${!isLoaded && "animate-pulse"}`}
      />
    </div>
  );
};

export default CardImage;
