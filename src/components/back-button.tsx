"use client";
import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <button
      onClick={() => router.back()}
      className="size-9 cursor-pointer rounded-xl hover:bg-neutral-50/10 backdrop-blur-md text-neutral-50 hover:text-neutral-50 active:scale-95 transition-all"
      aria-label="Go back"
    >
      <ArrowLeft size={20} className="mx-auto" />
    </button>
  );
}
