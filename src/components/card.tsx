import { ReactNode, ComponentProps } from "react";

interface CardProps extends ComponentProps<"div"> {
  children?: ReactNode;
}

const Card = ({ children, className, ...props }: CardProps = {}) => {
  return (
    <div
      className={`grid w-full backdrop-blur-md bg-white/5 rounded-2xl shadow-sm ${className}`}
      {...props}
    >
      <div className="col-start-1 row-start-1 box-border rounded-2xl border border-white/10" />
      <div className="col-start-1 row-start-1 py-4 px-6 size-full flex items-center">
        {children}
      </div>
    </div>
  );
};

export default Card;
