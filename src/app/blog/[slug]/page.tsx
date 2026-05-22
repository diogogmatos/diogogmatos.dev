import { Metadata } from "next";
import client from "../../../../tina/__generated__/client";
import fs from "fs";
import path from "path";
import { CalendarBlank, Clock } from "@phosphor-icons/react/dist/ssr";
import Markdown from "@/components/markdown";
import readingTime from "reading-time";
import extractTextFromAST, { Node } from "@/lib/body-parsing";
import Image from "next/image";

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
        .then((res) => res.data.body.body as string)) as Node,
    ),
  );

  return (
    <article className="flex flex-col gap-4 justify-start w-full">
      <section className="flex flex-col gap-4">
        {/* Title */}
        <h1 className="relative text-2xl sm:text-3xl font-primary">
          {postInfo.title}
        </h1>
        {/* Description */}
        <Markdown
          components={{
            p: ({ children }) => (
              <p className="text-sm text-balance">{children}</p>
            ),
          }}
        >
          {postInfo.project?.description || postInfo.description}
        </Markdown>
        {/* Meta Info */}
        <ul className="flex gap-4 flex-wrap items-center text-sm">
          <li className="flex items-center">
            <CalendarBlank size="1.1em" className="mr-1" weight="duotone" />
            <p>
              {new Date(postInfo.date).toLocaleString("en-US", {
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
        <figure className="w-full mt-2">
          <Image
            src={postInfo.project?.image || postInfo.image}
            width={600}
            height={600}
            alt={postInfo.alt}
            className="rounded-lg"
          />
        </figure>
      </section>
      {/* Content */}
      <section className="text-pretty">
        <Post />
      </section>
    </article>
  );
}
