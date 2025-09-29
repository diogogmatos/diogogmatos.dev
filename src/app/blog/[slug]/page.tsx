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
    <article className="flex flex-col justify-start w-full">
      <h1 className="relative text-4xl sm:text-5xl font-bold mb-4 scroll-mt-20 max-w-prose after:absolute after:left-0 after:-bottom-3 after:w-14 after:h-[3px] after:bg-gradient-to-r after:from-white after:to-transparent after:rounded-sm">
        {postInfo.title}
      </h1>
      <div className="flex flex-col lg:flex-row-reverse lg:gap-8 w-full">
        <div className="flex flex-col gap-3 mt-4 lg:mt-8 w-full">
          <div className="flex gap-4 flex-wrap items-center text-xs sm:text-sm mb-0.5">
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
          {(postInfo.project || postInfo.tags) && (
            <div className="flex gap-2 flex-wrap items-center">
              {(postInfo.project
                ? postInfo.project.stack.split(" ")
                : postInfo.tags
                  ? postInfo.tags.split(" ")
                  : []
              ).map((stack, idx) => {
                return <Tag key={idx} name={stack} />;
              })}
            </div>
          )}
          {postInfo.links && (
            <div className="flex gap-4 items-center">
              {postInfo.links.map((link, idx) => {
                return (
                  <span
                    key={idx}
                    className="flex space-x-1 items-center justify-center text-sm sm:text-base"
                  >
                    <Link size="1.1em" weight="duotone" />
                    <a
                      href={link?.link}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="text-white/90 hover:text-white pb-0.5 border-b border-white/20 hover:border-white transition-colors"
                    >
                      {link?.title}
                    </a>
                  </span>
                );
              })}
            </div>
          )}
          <span className="">
            <Markdown>
              {postInfo.project?.description || postInfo.description}
            </Markdown>
          </span>
        </div>
        <div className="w-full lg:min-w-max">
          <figure className="w-full my-6 sm:my-8">
            <SkeletonImage
              props={{
                src: postInfo.project?.image || postInfo.image,
                alt: postInfo.alt,
                className:
                  "rounded-lg overflow-hidden w-full lg:max-w-prose lg:max-h-[24rem] object-cover shadow-sm",
              }}
            />
          </figure>
          <div className="max-w-prose">
            <Post />
          </div>
        </div>
      </div>
    </article>
  );
}
