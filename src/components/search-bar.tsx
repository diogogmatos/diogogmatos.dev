import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  placeholders = ["Search..."],
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  placeholders?: string[];
}) {
  const [placeholderText, setPlaceholderText] = useState<string>(
    placeholders[0],
  );
  const [fadeOut, setFadeOut] = useState<boolean>(false);

  useEffect(() => {
    setInterval(() => {
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
  }, [placeholders]);

  return (
    <div className="bg-white/5 hover:bg-white/10 focus-within:bg-white/10 backdrop-blur-md border border-white/10 hover:border-white/20 focus-within:border-white/20 rounded-2xl w-full py-3 px-4 transition-colors">
      <span className="flex items-center gap-2.5 sm:gap-4">
        <MagnifyingGlass className="inline-flex" size="1.2em" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="search"
          className={clsx(
            "w-full bg-transparent outline-none text-sm sm:text-base placeholder:text-white/50 transition-opacity ease-in-out duration-500",
            fadeOut && searchQuery.length === 0 ? "opacity-0" : "opacity-100",
          )}
          placeholder={placeholderText}
        />
      </span>
    </div>
  );
}
