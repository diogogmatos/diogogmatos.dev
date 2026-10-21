"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

type Visitor = { number: number; returning: boolean };

// One of them is picked at random on each page load
const GREETINGS = [
  (number: string) => `You're visitor ${number}. Make yourself at home!`,
  (number: string) => `You're visitor ${number}. Glad you stopped by!`,
  (number: string) => `You're visitor ${number}. Thanks for dropping in!`,
];

// Asked once per page load, even if the footer renders again
let visitorRequest: Promise<Visitor | null> | undefined;

function greet({ number, returning }: Visitor) {
  const formatted = number.toLocaleString("en-US");
  if (returning) return `Welcome back, visitor ${formatted} ;)`;
  return GREETINGS[Math.floor(Math.random() * GREETINGS.length)](formatted);
}

// The visitor's number, which shows up once it's loaded
export default function VisitorCount() {
  const [greeting, setGreeting] = useState<string | null>(null);

  useEffect(() => {
    visitorRequest ??= fetch("/api/visitors", { method: "POST" })
      .then((response) => (response.ok ? response.json() : null))
      .catch(() => null);
    visitorRequest.then((visitor) => visitor && setGreeting(greet(visitor)));
  }, []);

  return (
    // Keeps its height while loading, so the footer doesn't move
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: greeting ? 1 : 0 }}
      className="min-h-4 text-xs text-neutral-50/45"
    >
      {greeting}
    </motion.p>
  );
}
