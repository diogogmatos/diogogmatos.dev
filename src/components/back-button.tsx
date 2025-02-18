"use client";

import { ArrowLeft } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="relative inline-flex items-center after:absolute after:w-full after:bottom-0 after:border-b after:border-white after:opacity-0 hover:after:opacity-100 after:transition-opacity cursor-pointer w-fit ml-2 text-lg"
    >
      <ArrowLeft size="1em" className="inline-flex mr-1" /> Back
    </button>
  );
}
