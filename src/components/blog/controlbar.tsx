"use client";

import { Joystick } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useLayoutEffect } from "react";
import clsx from "clsx";
import SearchBar from "@/components/search-bar";
import { useRouter, useSearchParams } from "next/navigation";
import { usePostData } from "@/providers/post-data-provider";

export default function ControlBar() {
  const { searchQuery, setSearchQuery, onlyProjects, setOnlyProjects, posts } =
    usePostData();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Initialize state based on URL search parameters
  useLayoutEffect(() => {
    const onlyProjects = searchParams.get("onlyProjects") ?? "false";
    setOnlyProjects(onlyProjects === "true");
    const search = searchParams.get("search") ?? "";
    setSearchQuery(search);
  }, [searchParams, setOnlyProjects, setSearchQuery]);

  // Update URL search parameters when state changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (onlyProjects) params.set("onlyProjects", "true");
    if (searchQuery) params.set("search", searchQuery);
    router.replace(`?${params.toString()}`);
  }, [onlyProjects, searchQuery, router]);

  return (
    <div className="flex items-center gap-4 w-full">
      <SearchBar />
      {posts && posts.some((p) => !p.project) && (
        <button
          onClick={() => setOnlyProjects(!onlyProjects)}
          className={clsx(
            onlyProjects
              ? "bg-blue-500/90 hover:bg-blue-500/90 hover:border-white/30"
              : "bg-white/5 hover:bg-white/10 hover:border-white/20",
            "min-w-fit px-4 py-3 text-sm sm:text-base rounded-2xl backdrop-blur-md border border-white/10 active:scale-95 font-medium hover:shadow-lg transition-all",
          )}
        >
          Projects <Joystick size="1.2em" className="inline-flex" />
        </button>
      )}
    </div>
  );
}
