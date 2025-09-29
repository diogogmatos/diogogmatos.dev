"use client";

import { useState } from "react";
import clsx from "clsx";
import Image, { ImageProps } from "next/image";

export default function SkeletonImage({
  props,
  noFilter,
  notRounded,
  className,
}: {
  props: ImageProps;
  noFilter?: boolean;
  notRounded?: boolean;
  className?: string;
}) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <div
      className={clsx(
        "relative size-full overflow-hidden",
        !notRounded && "rounded-lg",
        className,
      )}
    >
      <Image
        height={1500}
        width={1500}
        onLoad={() => setIsLoaded(true)}
        className={clsx(
          props.className || "overflow-hidden w-full shadow-sm",
          "transition-colors duration-500",
        )}
        {...(props as ImageProps)}
        alt={props.alt ?? "Image"}
      />
      <div
        className={clsx(
          "absolute top-0 left-0 right-0 size-full bg-gradient-to-br from-white/10 to-transparent backdrop-blur-[0.3px]",
          !isLoaded && "animate-pulse",
          isLoaded && noFilter && "hidden",
        )}
      />
    </div>
  );
}
