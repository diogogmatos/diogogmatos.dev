"use client";

import BlogPostCard from "../blog-post-card";
import { motion } from "motion/react";
import { Plus, TextAlignLeft } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { popIn } from "@/lib/animations";
import { searchPosts } from "@/lib/search-posts";

export default function BlogPostList({
  postsPerPage,
}: {
  postsPerPage: number;
}) {
  // The URL is the source of truth for the search, it's updated by the search bar
  const search = useSearchParams().get("search") ?? "";
  const results = useMemo(() => searchPosts(search), [search]);

  // Pages loaded for the current search, so a new search starts back at the first page
  const [loaded, setLoaded] = useState({ search, pages: 1 });
  const pages = loaded.search === search ? loaded.pages : 1;
  const posts = results.slice(0, pages * postsPerPage);

  return (
    <>
      <AnimatePresence>
        {posts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col gap-2 justify-center items-center w-full h-64"
          >
            <span className="p-3.5 rounded-full bg-white/10 backdrop-blur-md">
              <TextAlignLeft size="1em" className="text-2xl" />
            </span>
            <span className="flex flex-col items-center">
              <h3 className="font-semibold">No results found</h3>
              <p className="text-sm">Try using different keywords</p>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <ul className="grid gap-4">
        {posts.map((post, idx) => (
          <motion.li key={idx} {...popIn(idx * 0.1)}>
            <BlogPostCard post={post} />
          </motion.li>
        ))}
        {posts.length < results.length && (
          <motion.li key="load-more" {...popIn(posts.length * 0.1)}>
            <div className="flex flex-col gap-1.5 items-center w-full mt-2">
              <button
                className="p-3 bg-white/10 backdrop-blur-md hover:scale-105 active:scale-95 hover:bg-white/15 transition-all rounded-full w-fit"
                onClick={() => setLoaded({ search, pages: pages + 1 })}
              >
                <Plus size="1em" />
              </button>
              <p className="text-sm text-neutral-50/50">Load more</p>
            </div>
          </motion.li>
        )}
      </ul>
    </>
  );
}
