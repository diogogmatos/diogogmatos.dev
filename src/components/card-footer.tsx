import { ReactNode, ComponentProps } from "react";

interface CardFooterProps extends ComponentProps<"p"> {
  children?: ReactNode;
}

const CardFooter = ({ children, className, ...props }: CardFooterProps) => {
  return (
    <p
      className={`text-white/50 text-center w-full pt-2 text-sm ${className}`}
      {...props}
    >
      {children}
    </p>
  );
};

export default CardFooter;
