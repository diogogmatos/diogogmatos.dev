import Link from "next/link";

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
      className={`relative inline-flex items-center after:absolute after:w-full after:bottom-0 after:border-b after:border-white after:opacity-0 ${active ? "after:opacity-100" : "hover:after:opacity-100"} after:transition-opacity cursor-pointer w-fit text-lg`}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
}
