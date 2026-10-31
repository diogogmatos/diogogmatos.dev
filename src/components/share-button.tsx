"use client";

import clsx from "clsx";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { Check, Export } from "@phosphor-icons/react/dist/ssr";

// How long the check shows for
const CHECK_FOR = 2000;

// Opens the share sheet with the post's link on phones and tablets, and copies the link on
// computers, where few browsers have one and some get stuck, like Chromium's on Linux
export default function ShareButton({ title }: { title: string }) {
  // What it did, shown with a check for a moment
  const [done, setDone] = useState<"Link shared" | "Link copied" | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const show = (message: "Link shared" | "Link copied") => {
    setDone(message);
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setDone(null), CHECK_FOR);
  };

  const share = async () => {
    // The post's own link, without anything after it like a heading's #anchor
    const url = window.location.origin + window.location.pathname;
    if (navigator.share && matchMedia("(pointer: coarse)").matches) {
      try {
        await navigator.share({ title, url });
        // It only says that something was picked in it, like copying the link, not what
        return show("Link shared");
      } catch (error) {
        // Closed without picking anything
        if (error instanceof DOMException && error.name === "AbortError")
          return;
        // Otherwise it couldn't open, so it copies the link instead
      }
    }
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      return;
    }
    show("Link copied");
  };

  return (
    <>
      <button
        onClick={share}
        aria-label="Share this post"
        title="Share this post"
        data-umami-event="Share post"
        className={clsx(
          "flex items-center justify-center h-7 px-2.5 rounded-full backdrop-blur-md cursor-pointer transition-all active:scale-95",
          done
            ? "bg-white/15 text-neutral-50"
            : "bg-white/5 hover:bg-white/10 text-neutral-50/80 hover:text-neutral-50",
        )}
      >
        Share{" "}
        <motion.span
          key={String(!!done)}
          initial={done ? { scale: 0.5 } : false}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 12 }}
          className="ml-1"
        >
          {done ? (
            <Check size={16} weight="bold" />
          ) : (
            <Export size={16} weight="regular" />
          )}
        </motion.span>
      </button>
      <span className="sr-only" aria-live="polite">
        {done}
      </span>
    </>
  );
}
