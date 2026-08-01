"use client";

import { motion } from "motion/react";
import { useLayoutEffect, useState } from "react";

let isPopStateNavigation = false;

if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => {
    isPopStateNavigation = true;
    setTimeout(() => {
      isPopStateNavigation = false;
    }, 100);
  });
}

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

const fadeInBlur = {
  initial: { opacity: 0, y: 10, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
};

type FadeInProps<T extends React.ElementType> = {
  delay?: number;
  blurred?: boolean;
  children: React.ReactNode;
  as?: T;
} & Omit<React.ComponentPropsWithoutRef<T>, "delay" | "children" | "as">;

export default function FadeIn<T extends React.ElementType = "div">({
  delay = 0,
  blurred,
  children,
  as,
  ...props
}: FadeInProps<T>) {
  const [isNavigating, setIsNavigating] = useState(false);

  useLayoutEffect(() => {
    const navEntry = performance?.getEntriesByType("navigation")?.[0] as
      | PerformanceNavigationTiming
      | undefined;
    const isHardBackOrReload = navEntry?.type !== "navigate";
    if (isHardBackOrReload || isPopStateNavigation) {
      setIsNavigating(true);
    }
  }, []);

  const Tag = as || "div";
  const MotionComponent =
    typeof Tag === "string"
      ? (motion as unknown as Record<string, React.ElementType>)[Tag]
      : (
            motion as unknown as {
              create?: (t: React.ElementType) => React.ElementType;
            }
          ).create
        ? (
            motion as unknown as {
              create: (t: React.ElementType) => React.ElementType;
            }
          ).create(Tag)
        : (motion as unknown as (t: React.ElementType) => React.ElementType)(
            Tag,
          );

  if (isNavigating) {
    return <Tag {...props}>{children}</Tag>;
  }

  return (
    <MotionComponent
      initial={blurred ? fadeInBlur.initial : fadeIn.initial}
      animate={blurred ? fadeInBlur.animate : fadeIn.animate}
      transition={{ duration: 0.5, delay }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
