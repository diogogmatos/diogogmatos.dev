import { Metadata } from "next";
import client from "../../../../tina/__generated__/client";
import fs from "fs";
import path from "path";
import Image from "next/image";
import { Link } from "@phosphor-icons/react/dist/ssr";
import Markdown from "react-markdown";

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
    title: `${post?.title || slug} | ${post ? "Projects" : "Post"} | Diogo Matos`,
    description: post?.description || undefined,
    openGraph: {
      title: `${post?.title || slug} | ${post ? "Projects" : "Post"} | Diogo Matos`,
      description: post?.description || undefined,
      type: "article",
      url: `https://diogogmatos.dev/blog/${slug}`,
      authors: [post?.author || "Diogo Matos"],
      publishedTime: post?.date,
      images: post
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
      title: `${post?.title || slug} | ${post ? "Projects" : "Post"} | Diogo Matos`,
      description: post?.description || undefined,
      images: post
        ? [
            {
              url: post.image,
              alt: post.title,
            },
          ]
        : undefined,
    },
    alternates: {
      canonical: `https://diogogmatos.dev/blog/${slug}`,
    },
  };
}

export default async function Blog({
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
  return (
    <article className="flex flex-col justify-start w-full">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 border-b border-white/20 pb-3 scroll-mt-20 max-w-prose">
        {postInfo.title}
      </h1>
      <div className="flex flex-col md:flex-row-reverse gap-8 items-start w-full md:h-[350px] pb-4">
        <span className="flex flex-col gap-3 justify-between h-full">
          <div className="flex flex-col gap-3">
            {postInfo.links && (
              <div className="flex gap-4 items-center">
                {postInfo.links.map((link, idx) => {
                  return (
                    <span
                      key={idx}
                      className="flex space-x-1 items-center justify-center"
                    >
                      <Link size={18} weight="duotone" />
                      <a href={link?.link} className="hover:underline">
                        {link?.title}
                      </a>
                    </span>
                  );
                })}
              </div>
            )}
            <span className="text-lg">
              <Markdown>
                {postInfo.project?.description || postInfo.description}
              </Markdown>
            </span>
          </div>
          <span className="text-sm font-light">
            <p>
              by <strong className="font-medium">{postInfo.author}</strong>
            </p>
            <p className="text-xs mt-1">
              {new Date(postInfo.date).toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: false,
              })}
            </p>
          </span>
        </span>
        <Image
          src={postInfo.project?.image || postInfo.image}
          alt={postInfo.title}
          height={2000}
          width={2000}
          className="rounded-lg overflow-hidden max-w-full md:max-w-prose h-full object-cover"
        />
      </div>
      <div className="max-w-prose">
        <Post />
      </div>
    </article>
  );
}
