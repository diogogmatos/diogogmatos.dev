import { ReactNode, ComponentProps } from "react";

interface CardBodyProps extends ComponentProps<"span"> {
  children?: ReactNode;
}

const CardBody = ({ children, className, ...props }: CardBodyProps) => {
  return (
    <span
      className={`text-left space-y-2 pb-1 text-sm text-balance ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default CardBody;
