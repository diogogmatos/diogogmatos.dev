import Card from "./card";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import SkeletonImage from "./skeleton-image";
import { Post } from "../../tina/__generated__/types";
import Markdown from "react-markdown";
import clsx from "clsx";
import Tag from "./tag";

export default function BlogPostCard({
  post,
  mobileOnly,
}: {
  post: Post;
  mobileOnly?: boolean;
}) {
  return (
    <Card
      innerClassName="p-4 sm:p-5"
      className="hover:shadow-flush hover:shadow-white/15 transition-all duration-300"
    >
      <div
        className={clsx(
          "flex flex-col gap-5 items-start w-full",
          !mobileOnly && "lg:flex-row-reverse lg:gap-6 lg:h-72",
        )}
      >
        <span className="flex flex-col gap-3 justify-between h-full w-full">
          <div className="flex flex-col gap-3">
            <h1
              className={clsx(
                "text-xl font-bold border-b border-white/20 pb-2 mb-1",
                !mobileOnly && "sm:text-2xl",
              )}
            >
              {post.title}
            </h1>
            {(post.project || post.tags) && (
              <div className="flex flex-wrap gap-2 items-center">
                {(post.project
                  ? post.project.stack.split(" ")
                  : post.tags
                    ? post.tags.split(" ")
                    : []
                ).map((stack, idx) => {
                  return <Tag key={idx} name={stack} />;
                })}
              </div>
            )}
            <span className={!mobileOnly ? "sm:line-clamp-4" : ""}>
              <Markdown>
                {post.project?.description || post.description}
              </Markdown>
            </span>
          </div>
          <div
            className={clsx(
              "flex flex-col gap-5 items-start justify-between",
              !mobileOnly && "md:flex-row md:items-center",
            )}
          >
            <span className="text-sm font-light">
              <p>
                by <strong className="font-medium">{post.author}</strong>
              </p>
              <p className="text-xs mt-1">
                {new Date(post.date).toLocaleString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: false,
                })}
              </p>
            </span>
            <Link
              href={`/blog/${post._sys.filename}`}
              className={clsx(
                "button group w-full flex justify-between items-center",
                !mobileOnly && "md:block md:w-auto",
              )}
            >
              Read more{" "}
              <ArrowRight
                size="1.2em"
                className="inline-flex group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </span>
        <SkeletonImage
          src={post.project?.image || post.image}
          alt={post.alt}
          className={clsx(
            "rounded-lg overflow-hidden h-full object-cover shadow-sm",
            !mobileOnly && "lg:max-w-md",
          )}
        />
      </div>
    </Card>
  );
}
