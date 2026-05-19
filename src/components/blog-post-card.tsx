"use client";

import Card from "./card";
import { Clock, CalendarBlank } from "@phosphor-icons/react/dist/ssr";
import { Post } from "../../tina/__generated__/types";
import client from "../../tina/__generated__/client";
import Markdown from "react-markdown";
import readingTime from "reading-time";
import { useEffect, useState } from "react";
import extractTextFromAST, { Node } from "@/lib/body-parsing";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export default function BlogPostCard({ post }: { post: Post }) {
  const [readingTimeText, setReadingTimeText] = useState<string>("");
  const router = useRouter();

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
      className="hover:shadow-flush hover:shadow-white/5 transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={() => router.push(`/blog/${post._sys.filename}`)}
    >
      <div className={"flex items-start size-full"}>
        {/* <SkeletonImage
          props={{
            src: post.project?.image || post.image,
            alt: post.alt,
            className: "overflow-hidden h-full object-cover",
          }}
          notRounded
          className="max-w-56"
        /> */}
        <span className="flex flex-col gap-3 justify-between h-full w-full p-4 sm:p-5">
          <div className="flex flex-col gap-3">
            <h1 className="relative text-xl font-semibold">{post.title}</h1>
            <div className="flex gap-4 flex-wrap items-center text-sm">
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
            <span className="text-pretty text-sm text-neutral-50/90">
              <Markdown>
                {post.project?.description || post.description}
              </Markdown>
            </span>
          </div>
        </span>
      </div>
    </Card>
  );
}
