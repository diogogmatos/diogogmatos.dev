"use client";

import { CaretLeft } from "@phosphor-icons/react";
import { usePathname, useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <div className="w-full border-b border-white/20">
      <button
        onClick={() => router.back()}
        className="relative group pb-3 pr-3 inline-flex items-center cursor-pointer w-fit text-neutral-50/90 hover:text-neutral-50 active:scale-95 transition-all"
        aria-label="Go back"
      >
        <CaretLeft
          size="1em"
          className="inline-flex mr-1 group-hover:-translate-x-0.5 transition-transform"
        />{" "}
        Back
      </button>
    </div>
  );
}
