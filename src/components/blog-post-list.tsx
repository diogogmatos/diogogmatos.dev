"use client";

import { useTina } from "tinacms/dist/react";
import { Sdk } from "../../tina/__generated__/types";
import { Post } from "../../tina/__generated__/types";
import BlogPostCard from "./blog-post-card";
import FadeIn from "./animations/fade-in";

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

  const posts = (data.postConnection.edges ?? [])
    .map((r) => r?.node as Post)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      {posts.length > 0 &&
        posts.map((post, idx) => (
          <FadeIn as="li" delay={0.6 + idx * 0.1} key={idx}>
            <BlogPostCard post={post} />
          </FadeIn>
        ))}
    </>
  );
}
