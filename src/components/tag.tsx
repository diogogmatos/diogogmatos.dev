"use client";

import { useRouter } from "next/navigation";

export default function Tag({ name }: { name: string }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(`/blog?search=${name}`)}
      className=" text-xs font-light bg-white/10 hover:bg-white/15 transition-colors backdrop-blur-md px-2 py-1 rounded-full border border-white/10 select-none"
    >
      {name}
    </button>
  );
}
