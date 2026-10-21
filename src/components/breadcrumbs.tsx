"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import AppLink from "./app-link";
import BackButton from "./back-button";

// The back button, followed by the pages leading to the current one, like Home / Blog / Post
export default function Breadcrumbs({
  titles,
}: {
  titles: Record<string, string>;
}) {
  const pathname = usePathname();
  if (pathname === "/") return null;

  // Every path on the way to this page, like "/", "/blog" and "/blog/post"
  const paths = pathname
    .split("/")
    .map((_, idx, segments) => segments.slice(0, idx + 1).join("/") || "/")
    .filter((path) => titles[path]);

  return (
    <nav aria-label="Breadcrumbs" className="flex items-center gap-3">
      <BackButton />
      <ol className="flex items-center gap-2 min-w-0 text-sm font-medium pr-6">
        {paths.map((path, idx) => (
          <li
            key={path}
            // Only the current page shrinks, so a long post title is cut short instead of the links
            className={clsx(
              "flex items-center gap-2",
              idx < paths.length - 1 ? "shrink-0" : "min-w-0",
            )}
          >
            {idx > 0 && (
              <span aria-hidden className="text-neutral-50/30">
                /
              </span>
            )}
            {path === pathname ? (
              <span aria-current="page" className="truncate">
                {titles[path]}
              </span>
            ) : (
              <AppLink
                href={path}
                className="text-neutral-50/60 hover:text-neutral-50"
              >
                {titles[path]}
              </AppLink>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
