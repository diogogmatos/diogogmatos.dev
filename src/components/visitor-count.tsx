"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Visitor = { number: number; total: number; returning: boolean };

// One of them is picked at random on each page load
const GREETINGS = [
  (number: string) => `You're visitor ${number}. Make yourself at home!`,
  (number: string) => `You're visitor ${number}. Glad you stopped by!`,
  (number: string) => `You're visitor ${number}. Thanks for dropping in!`,
  (number: string) => `You're visitor ${number}. Welcome!`,
];

const WELCOME_BACKS = [
  (number: string) => `Welcome back, visitor ${number}!`,
  (number: string) => `Look who's back, visitor ${number}!`,
  (number: string) => `Good to see you again, visitor ${number}!`,
  (number: string) => `Nice to have you back, visitor ${number}!`,
  (number: string) => `We meet again, visitor ${number}!`,
];

// How long the line has to be on screen before it switches between the greeting and the total
const SWITCH_DELAY = 4000;

// Asked once per page load, even if the footer renders again
let visitorRequest: Promise<Visitor | null> | undefined;

function greet({ number, returning }: Visitor) {
  const formatted = number.toLocaleString("en-US");
  if (returning)
    return WELCOME_BACKS[Math.floor(Math.random() * WELCOME_BACKS.length)](
      formatted,
    );
  return GREETINGS[Math.floor(Math.random() * GREETINGS.length)](formatted);
}

// The visitor's number, which shows up once it's loaded
export default function VisitorCount() {
  const [greeting, setGreeting] = useState<string | null>(null);
  // Only shown once others came after this visitor, since it's their own number until then
  const [total, setTotal] = useState<number | null>(null);
  // Whether the total is showing instead of the greeting
  const [showTotal, setShowTotal] = useState(false);
  const reducedMotion = useReducedMotion();
  const line = useRef<HTMLDivElement>(null);

  useEffect(() => {
    visitorRequest ??= fetch("/api/visitors", { method: "POST" })
      .then((response) => (response.ok ? response.json() : null))
      .catch(() => null);
    visitorRequest.then((visitor) => {
      if (!visitor) return;
      setGreeting(greet(visitor));
      if (visitor.total > visitor.number) setTotal(visitor.total);
    });
  }, []);

  // The greeting and the total share the same line. Each time it comes into view it starts on the
  // greeting and switches to the total once, so it doesn't keep changing while it's on screen
  useEffect(() => {
    if (total === null || !line.current) return;
    let inView = false;
    let timeout: ReturnType<typeof setTimeout> | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Back to the greeting while it's off screen, for the next time it's seen
        if (!entry.isIntersecting) {
          inView = false;
          clearTimeout(timeout);
          setShowTotal(false);
          return;
        }
        // Only counts once all of it is on screen
        if (inView || entry.intersectionRatio < 0.99) return;
        inView = true;
        timeout = setTimeout(() => setShowTotal(true), SWITCH_DELAY);
      },
      { threshold: [0, 1] },
    );

    observer.observe(line.current);
    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [total]);

  // Each line slides up and blurs out as the next one comes in, or only fades with reduced motion
  const offset = reducedMotion ? 0 : 6;

  return (
    // Keeps its height while loading, so the footer doesn't move. It's as wide as the footer,
    // so it stays put when the lines aren't the same length
    <motion.div
      ref={line}
      initial={{ opacity: 0 }}
      animate={{ opacity: greeting ? 1 : 0 }}
      className="relative w-full min-h-4 text-xs text-neutral-50/45"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.p
          key={showTotal ? "total" : "greeting"}
          initial={{ opacity: 0, y: offset, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -offset, filter: "blur(4px)" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {showTotal && total !== null
            ? `${total.toLocaleString("en-US")} visitors so far`
            : greeting}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
}
