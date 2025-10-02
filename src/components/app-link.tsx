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
        "relative inline-flex items-center after:absolute after:bottom-0 after:border-b after:transition-all cursor-pointer w-fit sm:text-lg",
        active
          ? "after:w-full after:border-white"
          : "after:w-0 hover:after:w-full after:border-white/50",
      )}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
}
