"use client";

import clsx from "clsx";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { Check, Export } from "@phosphor-icons/react/dist/ssr";

// How long it shows that the link was copied
const COPIED_FOR = 2000;

// Opens the device's share sheet with the post's link, or copies the link where there isn't one,
// like on most computers
export default function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const share = async () => {
    // The post's own link, without anything after it like a heading's #anchor
    const url = window.location.origin + window.location.pathname;
    if (navigator.share) {
      // Rejected when the sheet is closed without sharing, which is fine
      return navigator.share({ title, url }).catch(() => {});
    }
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      return;
    }
    setCopied(true);
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setCopied(false), COPIED_FOR);
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
          copied
            ? "bg-white/15 text-neutral-50"
            : "bg-white/5 hover:bg-white/10 text-neutral-50/80 hover:text-neutral-50",
        )}
      >
        Share{" "}
        <motion.span
          key={String(copied)}
          initial={copied ? { scale: 0.5 } : false}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 12 }}
          className="ml-1"
        >
          {copied ? (
            <Check size={16} weight="bold" />
          ) : (
            <Export size={16} weight="regular" />
          )}
        </motion.span>
      </button>
      <span className="sr-only" aria-live="polite">
        {copied && "Link copied"}
      </span>
    </>
  );
}
