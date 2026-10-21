import * as Icons from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import AppLink from "../app-link";

// A vertical list of steps, e.g.
// <Pipeline>
//   <Step icon="Scissors" title="Cut out" tech="rembg" href="...">What happens</Step>
// </Pipeline>
export function Pipeline({ children }: { children: React.ReactNode }) {
  return <ol className="my-6">{children}</ol>;
}

export function Step({
  icon,
  title,
  tech,
  href,
  soon,
  children,
}: {
  icon: string; // Name of a Phosphor icon
  title: string;
  tech?: string; // Credit for the tool behind the step
  href?: string;
  soon?: boolean; // Not available yet
  children: React.ReactNode;
}) {
  const StepIcon = Icons[icon as keyof typeof Icons] as Icon | undefined;

  return (
    <li
      className={cn(
        "group relative flex gap-3 pb-5 last:pb-0",
        soon && "opacity-60",
      )}
    >
      {/* Line connecting to the next step */}
      <span
        aria-hidden="true"
        className="absolute left-4 top-9 bottom-1 w-px bg-white/15 group-last:hidden"
      />
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10 border border-white/10 backdrop-blur-md">
        {StepIcon && (
          <StepIcon size="1.1em" weight="duotone" aria-hidden="true" />
        )}
      </span>
      <div className="text-sm pt-1.5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-0.5">
          <span className="font-semibold">{title}</span>
          {tech &&
            (href ? (
              <AppLink
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-neutral-50/60 hover:text-neutral-50"
              >
                {tech} ↗
              </AppLink>
            ) : (
              <span className="text-xs text-neutral-50/60">{tech}</span>
            ))}
          {soon && (
            <span className="text-[0.65rem] uppercase tracking-wide bg-white/10 px-1.5 py-[1px] rounded-full border border-white/10">
              Soon
            </span>
          )}
        </div>
        <div className="text-neutral-50/80 text-pretty text-left">
          {children}
        </div>
      </div>
    </li>
  );
}
