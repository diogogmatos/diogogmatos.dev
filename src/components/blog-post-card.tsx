"use client";

import Card from "./card";
import { Clock, CalendarBlank } from "@phosphor-icons/react/dist/ssr";
import Markdown from "./markdown";
import readingTime from "reading-time";
import { useRouter } from "next/navigation";
import { Post } from "content-collections";

export default function BlogPostCard({ post }: { post: Post }) {
  const router = useRouter();

  return (
    <Card
      innerClassName="p-0"
      className="hover:shadow-flush hover:shadow-white/5 active:scale-[0.99] hover:scale-[1.01] transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={() => router.push(`/blog/${post._meta.fileName.split(".")[0]}`)}
    >
      <div className="flex items-start size-full">
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
              <span className="flex items-center">
                <Clock size="1.1em" className="mr-1" weight="duotone" />
                <p>{readingTime(post.content).text}</p>
              </span>
            </div>
            <span className="text-pretty text-sm text-neutral-50/90">
              <Markdown>{post.summary}</Markdown>
            </span>
          </div>
        </span>
      </div>
    </Card>
  );
}
