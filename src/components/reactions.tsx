"use client";

import clsx from "clsx";
import { motion } from "motion/react";
import { REACTIONS } from "@/lib/reactions";
import { REACTION_ICONS, useReactions } from "./reactions-provider";

// Anonymous reactions at the end of a post, shown once their counts have loaded
export default function Reactions() {
  const { reactions, toggle } = useReactions();
  if (!reactions) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-3 mt-12"
    >
      <p className="text-sm text-neutral-50/50">
        Enjoyed this post? Leave a reaction
      </p>
      <ul className="flex flex-wrap justify-center gap-2">
        {REACTIONS.map(({ id, label }) => {
          const Icon = REACTION_ICONS[id];
          const active = reactions.mine.includes(id);
          const count = reactions.counts[id];

          return (
            <li key={id}>
              <button
                onClick={() => toggle(id)}
                aria-pressed={active}
                title={label}
                data-umami-event={`Reaction: ${label}`}
                className={clsx(
                  "flex items-center gap-1.5 h-9 px-3 rounded-full backdrop-blur-md text-sm cursor-pointer active:scale-95 transition-all",
                  active
                    ? "bg-white/15 text-neutral-50"
                    : "bg-white/5 hover:bg-white/10 text-neutral-50/70 hover:text-neutral-50",
                )}
              >
                {/* Pops in when the reaction is left */}
                <motion.span
                  key={String(active)}
                  initial={active ? { scale: 0.5 } : false}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 12 }}
                  className="flex"
                >
                  <Icon size={18} weight={active ? "fill" : "duotone"} />
                </motion.span>
                <span className="sr-only">{label}</span>
                {count > 0 && <span className="tabular-nums">{count}</span>}
              </button>
            </li>
          );
        })}
      </ul>
    </motion.section>
  );
}
