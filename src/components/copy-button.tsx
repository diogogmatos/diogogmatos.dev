"use client";

import { Check, Copy } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState<boolean>(false);

  function handleCopy() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }

  return (
    <button
      className="size-6 flex items-center justify-center bg-white/10 rounded-sm hover:bg-white/20 transition-colors"
      title="Copy"
      onClick={handleCopy}
    >
      {copied ? <Check /> : <Copy />}
    </button>
  );
}
