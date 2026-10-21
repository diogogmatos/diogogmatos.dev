"use client";

import Link from "next/link";
import clsx from "clsx";

export default function AppLink({
  href,
  children,
  active,
  className,
  onClick,
  "data-umami-event": event,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  // The Umami event sent when it's clicked
  "data-umami-event"?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  // Umami follows links with this attribute itself, loading the whole site again, so links to this
  // site's pages send their event from here instead and go to the page without leaving the site
  const internal = href.startsWith("/") || href.startsWith("#");

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
      data-umami-event={internal ? undefined : event}
      onClick={(clickEvent) => {
        if (internal && event) {
          const { umami } = window as Window & {
            umami?: { track: (event: string) => void };
          };
          umami?.track(event);
        }
        onClick?.(clickEvent);
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
