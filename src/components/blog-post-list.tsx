"use client";

import { useTina } from "tinacms/dist/react";
import { Sdk } from "../../tina/__generated__/types";
import { Post } from "../../tina/__generated__/types";
import BlogPostCard from "./blog-post-card";
import { motion } from "motion/react";
import { useAnimation } from "@/providers/animation-provider";

export default function BlogPostList({
  props,
}: {
  props: Awaited<ReturnType<Sdk["postConnection"]>>;
}) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const play = useAnimation();

  const posts = (data.postConnection.edges ?? [])
    .map((r) => r?.node as Post)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      {posts.length > 0 &&
        posts.map((post, idx) => (
          <motion.li
            initial={play ? { opacity: 0, y: 10 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
            key={idx}
          >
            <BlogPostCard post={post} />
          </motion.li>
        ))}
    </>
  );
}
