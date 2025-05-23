import Link from "next/link";
import clsx from "clsx";

export default function AppLink({
  href,
  children,
  active,
  props,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  props?: React.HTMLProps<HTMLAnchorElement>;
}) {
  return (
    <Link
      className={clsx(
        "relative inline-flex items-center after:absolute after:w-full after:bottom-0 after:border-b after:border-white after:opacity-0 after:transition-opacity cursor-pointer w-fit text-lg",
        active ? "after:opacity-100" : "hover:after:opacity-50",
      )}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
}
