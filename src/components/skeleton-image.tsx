"use client";

import { useState } from "react";
import clsx from "clsx";
import Image, { ImageProps } from "next/image";

export default function SkeletonImage(
  props: ImageProps & {
    noFilter?: boolean;
  }
) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <div className="relative size-full">
      <Image
        height={1500}
        width={1500}
        onLoad={() => setIsLoaded(true)}
        className={clsx(
          props.className || "rounded-lg overflow-hidden w-full shadow-sm",
          "transition-colors duration-500"
        )}
        {...(props as ImageProps)}
        alt={props.alt ?? "Image"}
      />
      <div
        className={clsx(
          "absolute top-0 left-0 size-full rounded-lg bg-gradient-to-br from-white/10 to-transparent backdrop-blur-[0.3px]",
          !isLoaded && "animate-pulse",
          isLoaded && props.noFilter && "hidden"
        )}
      />
    </div>
  );
}
