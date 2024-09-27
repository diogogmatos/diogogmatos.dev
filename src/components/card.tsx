import { ReactNode, ComponentProps } from "react";

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
      className={`grid w-full backdrop-blur-md bg-white/5 rounded-2xl shadow-sm ${className}`}
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
