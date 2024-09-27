import Image from "next/legacy/image";
import { ComponentProps } from "react";

interface CardImageProps extends ComponentProps<"div"> {
  className?: string;
  src: string;
  alt: string;
}

const CardImage = ({ src, alt, className }: CardImageProps) => {
  return (
    <div className={`relative size-full -z-20 ${className}`}>
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="cover"
        className="rounded-xl opacity-80"
      />
      <div className="absolute size-full bg-gradient-to-br from-white/10 to-transparent rounded-xl backdrop-blur-[0.3px]" />
    </div>
  );
};

export default CardImage;
