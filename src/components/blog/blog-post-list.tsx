"use client";

import { usePostData } from "@/providers/post-data-provider";
import BlogPostCard from "../blog-post-card";
import { motion } from "motion/react";
import { TextAlignLeft } from "@phosphor-icons/react/dist/ssr";
import PostLoader from "../post-loader";
import { AnimatePresence } from "framer-motion";

export default function BlogPostList() {
  const { posts } = usePostData();

  if (posts === null) {
    return;
  }

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
            <span className="p-3.5 sm:p-4 rounded-full bg-white/10 backdrop-blur-md">
              <TextAlignLeft size="1em" className="text-2xl sm:text-3xl" />
            </span>
            <span className="flex flex-col items-center">
              <h3 className="sm:text-lg font-semibold">No results found</h3>
              <p className="text-sm sm:text-base">
                Try using different keywords
              </p>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <ul className="grid gap-4">
        {posts.length > 0 &&
          posts
            .map((post, idx) => (
              <motion.li
                key={idx}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.1, duration: 0.2 }}
              >
                <BlogPostCard post={post} />
              </motion.li>
            ))
            .concat(
              <motion.li
                key="post-loader"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: posts.length * 0.1,
                  duration: 0.2,
                }}
              >
                <PostLoader />
              </motion.li>,
            )}
      </ul>
    </>
  );
}
