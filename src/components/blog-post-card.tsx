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
        <span className="relative flex gap-3 items-start h-full w-full p-4">
          <div className="min-w-[70px] min-h-[70px] h-full">
            <div className="flex items-center justify-center aspect-square h-full">
              <DynamicIcon
                weight="duotone"
                className="text-neutral-50/90 text-4xl"
              />
            </div>
          </div>

          <div className="flex flex-col gap-0.5">
            <div className="flex gap-6 justify-between items-start">
              <h1
                title={post.title}
                className="relative font-semibold line-clamp-1"
              >
                {post.title}
              </h1>
              <div className="text-xs text-neutral-50/80 min-w-fit">
                <span className="flex items-center">
                  <p>{Math.round(readingTime(post.content, {}).minutes)} min</p>
                </span>
              </div>
            </div>
            <Markdown
              components={{
                p: ({ children }) => (
                  <p className="text-pretty text-sm text-neutral-50/90 line-clamp-2 mb-0.5 pr-10">
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
