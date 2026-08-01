"use client";

import Card from "./card";
import * as PhosphorIcons from "@phosphor-icons/react";
import Markdown from "./markdown";
import readingTime from "reading-time";
import { useRouter } from "next/navigation";
import { Post } from "content-collections";

export default function BlogPostCard({ post }: { post: Post }) {
  const router = useRouter();
  const DynamicIcon = PhosphorIcons[
    post.icon as keyof typeof PhosphorIcons
  ] as PhosphorIcons.Icon;

  return (
    <Card
      innerClassName="p-0"
      className="hover:shadow-flush hover:shadow-white/5 active:scale-[0.99] hover:scale-[1.01] transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={() => router.push(`/blog/${post._meta.fileName.split(".")[0]}`)}
    >
      <div className="flex items-start size-full">
        <span className="relative flex gap-4 items-start h-full w-full p-4 sm:p-5">
          <div className="min-w-[74px] min-h-[74px] h-full">
            <div className="flex items-center justify-center aspect-square h-full">
              <DynamicIcon
                weight="duotone"
                className="text-white/90 text-4xl sm:text-5xl"
              />
            </div>
          </div>

          <div className="flex flex-col gap-0.5 sm:gap-1">
            <div className="flex justify-between items-start">
              <h1
                title={post.title}
                className="relative text-lg font-semibold line-clamp-1"
              >
                {post.title}
              </h1>
              <div className="flex gap-4 flex-wrap items-center justify-end text-xs text-neutral-50/90 min-w-fit">
                <span className="flex items-center">
                  <PhosphorIcons.Clock
                    size="1.1em"
                    className="mr-1"
                    weight="duotone"
                  />
                  <p>{readingTime(post.content).text}</p>
                </span>
              </div>
            </div>
            <Markdown
              components={{
                p: ({ children }) => (
                  <p className="text-pretty text-sm text-neutral-50/90 line-clamp-2 mb-0.5">
                    {children}
                  </p>
                ),
              }}
            >
              {post.summary}
            </Markdown>
          </div>
        </span>
      </div>
    </Card>
  );
}
