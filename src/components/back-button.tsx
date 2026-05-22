"use client";

import { CaretLeft } from "@phosphor-icons/react";
import { usePathname, useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <div className="group w-full border-b border-white/20 pb-3">
      <button
        onClick={() => router.back()}
        className="relative inline-flex items-center cursor-pointer w-fit text-neutral-50/80 hover:text-neutral-50 active:scale-95 transition-all"
        aria-label="Go back"
      >
        <CaretLeft size="1em" className="inline-flex mr-1" /> Back
      </button>
    </div>
  );
}
