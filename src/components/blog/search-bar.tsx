"use client";

import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

const placeholders = [
  "Search by title...",
  "Search by description...",
  "Search by topic...",
  "Search by date...",
];

export default function SearchBar() {
  const searchParams = useSearchParams();
  const [visibleSearchQuery, setVisibleSearchQuery] = useState<string>(
    searchParams.get("search") ?? "",
  );
  const [placeholderText, setPlaceholderText] = useState<string>(
    placeholders[0],
  );
  const [fadeOut, setFadeOut] = useState<boolean>(false);

  // Updates the URL without a server round trip, which updates the post list
  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        window.history.replaceState(
          null,
          "",
          query
            ? `?search=${encodeURIComponent(query)}`
            : window.location.pathname,
        );
      }, 300),
    [],
  );
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVisibleSearchQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeOut(true);
      setTimeout(() => {
        setPlaceholderText((prev) => {
          const currentIndex = placeholders.indexOf(prev);
          const nextIndex =
            currentIndex === placeholders.length - 1 ? 0 : currentIndex + 1;
          return placeholders[nextIndex];
        });
      }, 500);
      setTimeout(() => {
        setFadeOut(false);
      }, 1000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white/5 hover:bg-white/10 focus-within:bg-white/10 backdrop-blur-md rounded-2xl w-full py-3 px-4 transition-colors">
      <span className="flex items-center gap-2.5">
        <MagnifyingGlass className="inline-flex" size="1em" />
        <input
          value={visibleSearchQuery}
          onChange={onInputChange}
          type="search"
          className={clsx(
            "w-full bg-transparent outline-none text-sm placeholder:text-neutral-50/50 transition-opacity ease-in-out duration-500",
            fadeOut && visibleSearchQuery.length === 0
              ? "opacity-0"
              : "opacity-100",
          )}
          placeholder={placeholderText}
        />
      </span>
    </div>
  );
}
