"use client";

import { ArrowLeft } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="relative inline-flex items-center cursor-pointer w-fit text-lg hover:-translate-x-1 transition-transform"
    >
      <ArrowLeft size="1.1em" className="inline-flex mr-1"/>
    </button>
  );
}
