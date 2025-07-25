"use client";

import { useTina } from "tinacms/dist/react";
import { Sdk } from "../../tina/__generated__/types";
import { Post } from "../../tina/__generated__/types";
import BlogPostCard from "./blog-post-card";

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

  return (
    <>
      {data.postConnection.edges &&
        data.postConnection.edges
          .filter((r) => r !== null && r.node)
          .map((r) => r?.node as Post)
          .sort((a, b) => (a.date < b.date ? 1 : -1))
          .map((post, idx) => (
            <li key={idx}>
              <BlogPostCard post={post} />
            </li>
          ))}
    </>
  );
}
