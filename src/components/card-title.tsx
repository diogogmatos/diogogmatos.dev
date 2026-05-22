import { ReactNode, ComponentProps } from "react";

interface CardTitleProps extends ComponentProps<"div"> {
  children?: ReactNode;
}

const CardTitle = ({ children, className, ...props }: CardTitleProps) => {
  return (
    <div className={`font-semibold text-lg pb-2 ${className}`} {...props}>
      {children}
    </div>
  );
};

export default CardTitle;
