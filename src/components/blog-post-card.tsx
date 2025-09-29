"use client";

import Card from "./card";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  CalendarBlank,
} from "@phosphor-icons/react/dist/ssr";
import SkeletonImage from "./skeleton-image";
import { Post } from "../../tina/__generated__/types";
import client from "../../tina/__generated__/client";
import Markdown from "react-markdown";
import readingTime from "reading-time";
import { useEffect, useState } from "react";
import extractTextFromAST, { Node } from "@/lib/body-parsing";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";

export default function BlogPostCard({ post }: { post: Post }) {
  const [readingTimeText, setReadingTimeText] = useState<string>("");

  useEffect(() => {
    const fetchPostBody = async () => {
      const body = await client.queries
        .body({
          relativePath: `${post._sys.filename}.mdx`,
        })
        .then((res) => res.data.body.body);

      setReadingTimeText(readingTime(extractTextFromAST(body as Node)).text);
    };
    fetchPostBody();
  }, [post._sys.filename, setReadingTimeText]);

  return (
    <Card
      innerClassName="p-0"
      className="hover:shadow-flush hover:shadow-white/10 transition-all duration-300 overflow-hidden"
    >
      <div className={"flex flex-col items-start w-full md:flex-row md:h-60"}>
        <SkeletonImage
          props={{
            src: post.project?.image || post.image,
            alt: post.alt,
            className:
              "overflow-hidden h-full object-cover max-h-52 md:max-h-none",
          }}
          notRounded
          className="md:max-w-sm"
        />
        <span className="flex flex-col gap-3 justify-between h-full w-full p-4 sm:p-5">
          <div className="flex flex-col gap-3">
            <h1 className="relative text-xl sm:text-2xl font-bold mb-4 scroll-mt-20 max-w-prose after:absolute after:left-0 after:-bottom-1.5 after:w-10 after:h-[3px] after:bg-gradient-to-r after:from-white after:to-transparent after:rounded-sm">
              {post.title}
            </h1>
            <div className="flex gap-4 flex-wrap items-center text-xs sm:text-sm mb-0.5">
              <span className="flex items-center">
                <CalendarBlank size="1.1em" className="mr-1" weight="duotone" />
                <p>
                  {new Date(post.date).toLocaleString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </span>
              <AnimatePresence>
                {readingTimeText !== "" && (
                  <motion.span
                    className="flex items-center"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Clock size="1.1em" className="mr-1" weight="duotone" />
                    <p>{readingTimeText}</p>
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <span className={"md:line-clamp-2"}>
              <Markdown>
                {post.project?.description || post.description}
              </Markdown>
            </span>
          </div>
          <div className="w-full flex justify-end">
            <Link
              href={`/blog/${post._sys.filename}`}
              className={
                "button group w-full flex justify-between items-center md:block md:w-auto"
              }
              data-umami-event={`Blog Post: ${post.title}`}
            >
              Read more{" "}
              <ArrowRight
                size="1.2em"
                className="inline-flex group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </span>
      </div>
    </Card>
  );
}
