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
        "inline bg-gradient-to-r from-white/70 to-white/70 bg-no-repeat bg-left-bottom transition-all duration-150 cursor-pointer",
        active
          ? "bg-[size:100%_var(--underline-thickness,1px)]"
          : "bg-[size:0%_var(--underline-thickness,1px)] hover:bg-[size:100%_var(--underline-thickness,1px)]",
        className,
      )}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
}
