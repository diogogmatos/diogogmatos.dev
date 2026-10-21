import * as Icons from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

// Full class names, so Tailwind generates them
const COLUMNS = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-3" };

// A grid of small cards, e.g.
// <Features>
//   <Feature icon="HandTap" title="Tap an item">What it does</Feature>
// </Features>
// By default it fits as many cards per row as there's room for. Set columns
// to force a layout, like 2 to show 4 cards as a 2×2 grid
export function Features({
  columns,
  children,
}: {
  columns?: keyof typeof COLUMNS;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid gap-3 my-6",
        columns
          ? COLUMNS[columns]
          : "sm:grid-cols-[repeat(auto-fit,minmax(9rem,1fr))]",
      )}
    >
      {children}
    </div>
  );
}

export function Feature({
  icon,
  title,
  children,
}: {
  icon: string; // Name of a Phosphor icon
  title: string;
  children: React.ReactNode;
}) {
  const FeatureIcon = Icons[icon as keyof typeof Icons] as Icon | undefined;

  return (
    <div className="rounded-xl bg-white/5 border border-white/10 backdrop-blur-md p-3.5 text-sm text-left">
      {FeatureIcon && (
        <FeatureIcon
          size="1.4em"
          weight="duotone"
          aria-hidden="true"
          className="mb-2"
        />
      )}
      <div className="font-semibold mb-0.5">{title}</div>
      <div className="text-neutral-50/80 text-pretty">{children}</div>
    </div>
  );
}
