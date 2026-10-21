"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Smiley } from "@phosphor-icons/react/dist/ssr";
import { REACTIONS } from "@/lib/reactions";
import { REACTION_ICONS, useReactions } from "./reactions-provider";

// Reactions like in messaging apps: the ones left so far, then a button that opens a picker
// The button is part of the page from the start, so the row doesn't change height when the counts load
export default function ReactionPicker() {
  const { reactions, unavailable, toggle } = useReactions();
  const [open, setOpen] = useState(false);
  // Chips that are there when the counts load fade in one by one, and the ones left afterwards pop in
  const [loaded, setLoaded] = useState(false);
  // Whether the picker opens towards the left, when there's no room for it on the right
  const [openLeft, setOpenLeft] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const picker = useRef<HTMLDivElement>(null);

  // Closes with a click outside of it, or with Escape
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Measured before it's painted, so it never shows up cut off by the edge of the screen
  useLayoutEffect(() => {
    if (!open || !container.current || !picker.current) return;
    const { left } = container.current.getBoundingClientRect();
    setOpenLeft(
      left + picker.current.offsetWidth >
        document.documentElement.clientWidth - 16,
    );
  }, [open]);

  useEffect(() => {
    if (reactions) setLoaded(true);
  }, [reactions]);

  if (unavailable) return null;

  return (
    <div
      ref={container}
      className="relative flex flex-wrap items-center gap-1.5"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {REACTIONS.filter(({ id }) => reactions?.counts[id]).map(
          ({ id, label }, idx) => {
            const Icon = REACTION_ICONS[id];
            const active = reactions!.mine.includes(id);

            return (
              <motion.button
                key={id}
                layout
                initial={
                  loaded
                    ? { opacity: 0, scale: 0.5, filter: "blur(0px)" }
                    : { opacity: 0, scale: 0.8, filter: "blur(4px)" }
                }
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={
                  loaded
                    ? { type: "spring", stiffness: 500, damping: 25 }
                    : { duration: 0.5, ease: "easeOut", delay: idx * 0.1 }
                }
                onClick={() => toggle(id)}
                aria-pressed={active}
                title={label}
                className={clsx(
                  "flex items-center gap-1 h-7 px-2.5 rounded-full text-xs backdrop-blur-md cursor-pointer transition-colors",
                  active
                    ? "bg-white/15 ring-1 ring-inset ring-white/25 text-neutral-50"
                    : "bg-white/5 hover:bg-white/10 text-neutral-50/80",
                )}
              >
                <Icon size={14} weight={active ? "fill" : "duotone"} />
                <span className="sr-only">{label}</span>
                <span className="tabular-nums">{reactions!.counts[id]}</span>
              </motion.button>
            );
          },
        )}
      </AnimatePresence>

      <motion.button
        layout
        // Slides over as slowly as the chips fade in when the counts load
        transition={
          loaded
            ? { type: "spring", stiffness: 500, damping: 25 }
            : { duration: 0.5, ease: "easeOut" }
        }
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Add a reaction"
        title="Add a reaction"
        className={clsx(
          "relative flex items-center justify-center size-7 rounded-full backdrop-blur-md cursor-pointer transition-colors",
          open
            ? "bg-white/15 text-neutral-50"
            : "bg-white/5 hover:bg-white/10 text-neutral-50/80 hover:text-neutral-50",
        )}
      >
        <Smiley size={16} weight="regular" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={picker}
            initial={{ opacity: 0, scale: 0.8, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 6 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={clsx(
              "absolute bottom-full mb-2 z-10 flex gap-0.5 p-1 rounded-full bg-black/10 backdrop-blur-2xl border border-white/10 shadow-lg",
              openLeft
                ? "right-0 origin-bottom-right"
                : "left-0 origin-bottom-left",
            )}
          >
            {REACTIONS.map(({ id, label }, idx) => {
              const Icon = REACTION_ICONS[id];
              const active = !!reactions?.mine.includes(id);

              return (
                <motion.button
                  key={id}
                  disabled={!reactions}
                  data-umami-event={`Reaction: ${label}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 600,
                    damping: 20,
                    delay: idx * 0.03,
                  }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    toggle(id);
                    setOpen(false);
                  }}
                  aria-pressed={active}
                  title={label}
                  className={clsx(
                    "flex items-center justify-center size-9 rounded-full cursor-pointer",
                    active ? "bg-white/15" : "hover:bg-white/10",
                  )}
                >
                  <Icon size={20} weight={active ? "fill" : "duotone"} />
                  <span className="sr-only">{label}</span>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
