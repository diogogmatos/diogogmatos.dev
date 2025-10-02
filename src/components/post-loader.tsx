"use client";

import { usePostData } from "@/providers/post-data-provider";
import { Plus } from "@phosphor-icons/react/dist/ssr";

export default function PostLoader() {
  const { hasNextPage, loadMore } = usePostData();

  if (hasNextPage) {
    return (
      <div className="flex flex-col gap-2 items-center w-full mt-2">
        <button
          className="p-3 bg-white/10 backdrop-blur-md border border-white/10 hover:scale-110 active:scale-95 hover:bg-white/15 transition-all rounded-full w-fit"
          onClick={loadMore}
        >
          <Plus size="1em" />
        </button>
        <p className="text-sm text-white/50">Load more</p>
      </div>
    );
  }
}
