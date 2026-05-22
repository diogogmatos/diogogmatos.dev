"use client";

import BlogPostList from "@/components/blog-post-list";
import { Sdk } from "../../tina/__generated__/types";
import FadeIn from "./animations/fade-in";

export default function Posts({
  postProps,
}: {
  postProps: Awaited<ReturnType<Sdk["postConnection"]>>;
}) {
  return (
    <section className="flex flex-col gap-8 sm:gap-10">
      <FadeIn
        as="h1"
        delay={0.4}
        className="font-primary text-2xl sm:text-3xl pl-2"
      >
        Posts
      </FadeIn>
      {/* <Link className="button" href="/blog">
          View all{" "}
          <ArrowRight
            size="1.2em"
            className="inline-flex group-hover:translate-x-1 transition-transform"
          />
        </Link> */}
      <ul className="grid gap-4">
        <BlogPostList props={postProps} />
      </ul>
    </section>
  );
}
