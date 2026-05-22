import Link from "next/link";
import clsx from "clsx";

export default function AppLink({
  href,
  children,
  active,
  className,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link
      className={clsx(
        "relative inline-flex items-center after:absolute after:bottom-0.5 after:border-b-[1px] after:border-white after:transition-all cursor-pointer w-fit",
        active ? "after:w-full" : "after:w-0 hover:after:w-full",
        className,
      )}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
}
