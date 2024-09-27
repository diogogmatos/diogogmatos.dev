import { ReactNode, ComponentProps } from "react";

interface CardBodyProps extends ComponentProps<"span"> {
  children?: ReactNode;
}

const CardBody = ({ children, className, ...props }: CardBodyProps) => {
  return (
    <span
      className={`text-justify space-y-2 pb-1 text-sm sm:text-base ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default CardBody;
