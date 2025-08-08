"use client";

import { ReactNode, ComponentProps } from "react";
import clsx from "clsx";

interface CardProps extends ComponentProps<"div"> {
  children?: ReactNode;
  innerClassName?: string;
}

const Card = ({
  children,
  className,
  innerClassName,
  ...props
}: CardProps = {}) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 w-full backdrop-blur-md bg-white/5 rounded-2xl shadow-sm",
        className,
      )}
      {...props}
    >
      <div className="col-start-1 row-start-1 box-border rounded-2xl border border-white/10" />
      <div
        className={`col-start-1 row-start-1 ${innerClassName === undefined || !(innerClassName.includes("px") || innerClassName.includes("py") || innerClassName.includes("p")) ? "py-4 px-5" : ""} ${innerClassName}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Card;
