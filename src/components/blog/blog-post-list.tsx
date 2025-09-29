"use client";

import { useControlBar } from "@/providers/post-data-provider";
import Card from "../card";
import BlogPostCard from "../blog-post-card";
import { motion } from "motion/react";
import { TextAlignLeft } from "@phosphor-icons/react/dist/ssr";
import { useWidth } from "@/providers/width-provider";
import clsx from "clsx";

export default function BlogPostList() {
  const { filteredPosts, posts } = useControlBar();
  const width = useWidth();
  return (
    <>
      {filteredPosts.length === 0 && posts.length > 0 && (
        <div className="flex flex-col gap-2 justify-center items-center w-full h-64">
          <span className="p-3.5 sm:p-4 rounded-full bg-white/10">
            <TextAlignLeft size={clsx(width >= 640 ? "1.8em" : "1.5em")} />
          </span>
          <span className="flex flex-col items-center">
            <h3 className="sm:text-lg font-semibold">No results found</h3>
            <p className="text-sm sm:text-base">Try using different keywords</p>
          </span>
        </div>
      )}
      {posts.length === 0 && (
        <ul className="grid gap-4">
          {Array.from({ length: 3 }, (_, i) => i).map((_, idx) => (
            <li key={idx}>
              <Card className="animate-pulse h-60" />
            </li>
          ))}
        </ul>
      )}
      <ul className="grid gap-4">
        {filteredPosts.length > 0 &&
          filteredPosts.map((post, idx) => (
            <motion.li
              key={idx}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.2 }}
            >
              <BlogPostCard post={post} />
            </motion.li>
          ))}
      </ul>
    </>
  );
}
