"use client";

import BlogPostList from "@/components/blog-post-list";
import { Sdk } from "../../tina/__generated__/types";
import { motion } from "motion/react";
import { useAnimation } from "@/providers/animation-provider";

export default function Posts({
  postProps,
}: {
  postProps: Awaited<ReturnType<Sdk["postConnection"]>>;
}) {
  const play = useAnimation();

  return (
    <>
      <div className="flex items-center justify-between gap-4 w-full">
        <motion.h1
          initial={play ? { opacity: 0, y: 10, filter: "blur(6px)" } : false}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="font-primary text-2xl sm:text-3xl pl-2"
        >
          Posts
        </motion.h1>
        {/* <Link className="button" href="/blog">
          View all{" "}
          <ArrowRight
            size="1.2em"
            className="inline-flex group-hover:translate-x-1 transition-transform"
          />
        </Link> */}
      </div>
      <ul className="grid gap-4">
        <BlogPostList props={postProps} />
      </ul>
    </>
  );
}
