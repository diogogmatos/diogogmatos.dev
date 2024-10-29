import { ReactNode, ComponentProps } from "react";

interface CardProps extends ComponentProps<"div"> {
  children?: ReactNode;
  innerClassName?: string;
  clickable?: boolean;
}

const Card = ({
  children,
  className,
  innerClassName,
  clickable,
  ...props
}: CardProps = {}) => {
  return (
    <div
      className={`grid w-full backdrop-blur-md bg-white/5 rounded-2xl shadow-sm ${clickable && "hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer"} ${className}`}
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
