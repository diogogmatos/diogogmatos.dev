"use client";
import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

// Whether the previous page in the tab's history is a page of this site
function canGoBack() {
  // The Navigation API only lists this site's pages, so any page before the current one is ours
  const { navigation } = window as Window & {
    navigation?: { currentEntry: { index: number } | null };
  };
  if (navigation?.currentEntry) return navigation.currentEntry.index > 0;
  // Browsers without it can only tell whether the tab has any history at all
  return window.history.length > 1;
}

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  // Goes back to wherever the visitor came from, like the home page or a search on the blog.
  // Visitors who opened this page directly go to its parent instead, so from a post to the blog
  const goBack = () => {
    if (canGoBack()) return router.back();
    // Replaced, so going back again from the parent doesn't return here
    router.replace(pathname.slice(0, pathname.lastIndexOf("/")) || "/");
  };

  return (
    <button
      onClick={goBack}
      className="size-9 shrink-0 cursor-pointer rounded-xl bg-white/10 sm:bg-transparent hover:bg-white/10 backdrop-blur-md text-neutral-50 hover:text-neutral-50 active:scale-95 transition-all"
      aria-label="Go back"
    >
      <ArrowLeft size={20} className="mx-auto" />
    </button>
  );
}
