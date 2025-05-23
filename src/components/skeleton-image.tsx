"use client";

import { useState } from "react";
import clsx from "clsx";
import Image, { ImageProps } from "next/image";

export default function SkeletonImage(props: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Image
      height={1500}
      width={1500}
      onLoadingComplete={() => setIsLoading(false)}
      className={clsx(
        clsx(
          props.className || "rounded-lg overflow-hidden w-full my-4 shadow-sm",
          "transition-colors duration-500",
        ),
        isLoading ? "bg-white/20 animate-pulse" : "",
      )}
      {...(props as ImageProps)}
      alt={props.alt ?? "Image"}
    />
  );
}
