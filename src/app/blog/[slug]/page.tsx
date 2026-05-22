import { Metadata } from "next";
import fs from "fs";
import path from "path";
import { CalendarBlank, Clock } from "@phosphor-icons/react/dist/ssr";
import Markdown from "@/components/markdown";
import readingTime from "reading-time";
import Image from "next/image";
import { allPosts } from "content-collections";
import { customComponents } from "@/mdx-components";

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
  const post = allPosts.find((p) => p._meta.fileName.split(".")[0] === slug);

  return {
    metadataBase: new URL("https://diogogmatos.dev"),
    title: `${post?.title || slug} | Diogo Matos' Blog`,
    description: post?.summary,
    keywords: post?.tags,
    authors: [{ name: "Diogo Matos" }],
    openGraph: {
      title: `${post?.title || slug} | Diogo Matos' Blog`,
      description: post?.summary,
      type: "article",
      url: `/blog/${slug}`,
      authors: ["Diogo Matos"],
      publishedTime: post?.date ? new Date(post.date).toISOString() : undefined,
      tags: post?.tags,
      images: post?.cover
        ? [
            {
              url: post?.cover,
              alt: post?.coverAlt || post?.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post?.title || slug} | Diogo Matos' Blog`,
      description: post?.summary || undefined,
      images: post?.cover
        ? [
            {
              url: post?.cover,
              alt: post?.coverAlt || post?.title,
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
  const post = allPosts.find((p) => p._meta.fileName.split(".")[0] === slug);

  if (!post) {
    return null;
  }

  const postStats = readingTime(post.content);

  return (
    <article className="flex flex-col gap-4 justify-start w-full">
      <section className="flex flex-col gap-4">
        {/* Title */}
        <h1 className="relative text-2xl sm:text-3xl font-primary">
          {post.title}
        </h1>
        {/* Description */}
        <Markdown
          components={{
            p: ({ children }) => (
              <p className="text-sm text-balance">{children}</p>
            ),
          }}
        >
          {post.summary}
        </Markdown>
        {/* Meta Info */}
        <ul className="flex gap-4 flex-wrap items-center text-sm">
          <li className="flex items-center">
            <CalendarBlank size="1.1em" className="mr-1" weight="duotone" />
            <p>
              {new Date(post.date).toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </li>
          <li className="flex items-center">
            <Clock size="1.1em" className="mr-1" weight="duotone" />
            <p>{postStats.text}</p>
          </li>
        </ul>
        {/* Image */}
        {post.cover && (
          <figure className="w-full mt-2">
            <Image
              src={post.cover}
              width={600}
              height={600}
              alt={post.coverAlt || post.title}
              className="rounded-lg"
            />
          </figure>
        )}
      </section>
      {/* Content */}
      <section className="text-pretty">
        <Markdown components={customComponents}>{post.content}</Markdown>
      </section>
    </article>
  );
}
