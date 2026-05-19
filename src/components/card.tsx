"use client";

import { ReactNode, ComponentProps } from "react";
import clsx from "clsx";

interface CardProps extends ComponentProps<"div"> {
  children?: ReactNode;
  innerClassName?: string;
  hoverShadow?: boolean;
}

const Card = ({
  children,
  className,
  innerClassName,
  hoverShadow = true,
  ...props
}: CardProps = {}) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 w-full bg-white/5 rounded-xl backdrop-blur-md",
        className,
      )}
      {...props}
    >
      <div
        className={clsx(
          "col-start-1 row-start-1 rounded-xl z-10",
          hoverShadow &&
            "hover:shadow-flush hover:shadow-white/5 transition-all duration-300",
          {
            "py-3 px-4 sm:py-4 sm:px-5":
              !innerClassName ||
              !(
                innerClassName.includes("px") ||
                innerClassName.includes("py") ||
                innerClassName.includes("p")
              ),
          },
          innerClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Card;
