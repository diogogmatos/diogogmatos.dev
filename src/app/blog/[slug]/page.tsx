import { Metadata } from "next";
import client from "../../../../tina/__generated__/client";
import fs from "fs";
import path from "path";
import { CalendarBlank, Clock, Link } from "@phosphor-icons/react/dist/ssr";
import Markdown from "react-markdown";
import SkeletonImage from "@/components/skeleton-image";
import Tag from "@/components/tag";
import readingTime from "reading-time";
import extractTextFromAST, { Node } from "@/lib/body-parsing";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = fs.readdirSync(path.join("src/content/posts"));
  return posts
    .filter((filename) => filename.includes("mdx"))
    .map((post) => ({
      slug: post.split(".")[0],
    }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const post = await client.queries
    .post({
      relativePath: `${slug}.json`,
    })
    .then((res) => res.data.post);

  return {
    metadataBase: new URL("https://diogogmatos.dev"),
    title: `${post.title || slug} | Diogo Matos' Blog`,
    description: post.description || undefined,
    keywords: post.tags?.split(" "),
    authors: [{ name: "Diogo Matos" }],
    openGraph: {
      title: `${post.title || slug} | Diogo Matos' Blog`,
      description: post.project?.description || post.description,
      type: "article",
      url: `/blog/${slug}`,
      authors: ["Diogo Matos"],
      publishedTime: post.date,
      tags: post.tags?.split(" "),
      images: post.image
        ? [
            {
              url: post.image,
              alt: post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title || slug} | Diogo Matos' Blog`,
      description: post.description || undefined,
      images: post.image
        ? [
            {
              url: post.image,
              alt: post.title,
            },
          ]
        : undefined,
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const { default: Post } = await import(`@/content/posts/${slug}.mdx`);
  const postInfo = await client.queries
    .post({
      relativePath: `${slug}.json`,
    })
    .then((res) => res.data.post);
  const postStats = readingTime(
    extractTextFromAST(
      (await client.queries
        .body({
          relativePath: `${slug}.mdx`,
        })
        .then((res) => res.data.body.body)) as Node,
    ),
  );

  return (
    <article className="flex flex-col justify-start w-full max-w-[560px]">
      <section className="flex flex-col gap-4">
        {/* Title */}
        <h1 className="relative text-2xl sm:text-3xl font-primary">
          {postInfo.title}
        </h1>
        {/* Description */}
        <span className="text-sm text-balance">
          <Markdown>
            {postInfo.project?.description || postInfo.description}
          </Markdown>
        </span>
        {/* Meta Info */}
        <div className="flex gap-4 flex-wrap items-center text-sm">
          <span className="flex items-center">
            <CalendarBlank size="1.1em" className="mr-1" weight="duotone" />
            <p>
              {new Date(postInfo.date).toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </span>
          <span className="flex items-center">
            <Clock size="1.1em" className="mr-1" weight="duotone" />
            <p>{postStats.text}</p>
          </span>
        </div>
        {/* Image */}
        <figure className="w-full mt-2">
          <SkeletonImage
            props={{
              src: postInfo.project?.image || postInfo.image,
              alt: postInfo.alt,
              className:
                "rounded-lg overflow-hidden w-full object-cover shadow-sm",
            }}
          />
        </figure>
        {/* Content */}
        <span className="text-pretty">
          <Post />
        </span>
      </section>
    </article>
  );
}
