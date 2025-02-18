"use client";

import { useRouter } from "next/navigation";
import { ReactNode, ComponentProps } from "react";

interface CardProps extends ComponentProps<"div"> {
  children?: ReactNode;
  innerClassName?: string;
  slug?: string;
}

const Card = ({
  children,
  className,
  innerClassName,
  slug,
  ...props
}: CardProps = {}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => (slug ? router.push(slug) : {})}
      className={`grid w-full backdrop-blur-md bg-white/5 rounded-2xl shadow-sm ${slug && "hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer"} ${className}`}
      {...props}
    >
      <div className="col-start-1 row-start-1 box-border rounded-2xl border border-white/10" />
      <div
        className={`col-start-1 row-start-1 size-full ${innerClassName === undefined || !(innerClassName.includes("px") || innerClassName.includes("py")) ? "py-4 px-6" : ""} ${innerClassName}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Card;
