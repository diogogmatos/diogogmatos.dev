import { Metadata } from "next";
import client from "../../../../tina/__generated__/client";
import fs from "fs";
import path from "path";
import { Link } from "@phosphor-icons/react/dist/ssr";
import Markdown from "react-markdown";
import SkeletonImage from "@/components/skeleton-image";

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
    title: `${post.title || slug} | ${post.project ? "Projects" : "Blog"} | Diogo Matos`,
    description: post.description || undefined,
    keywords: post.tags?.split(" "),
    authors: [{ name: post.author }],
    openGraph: {
      title: `${post.title || slug} | ${post.project ? "Projects" : "Blog"} | Diogo Matos`,
      description: post.project?.description || post.description,
      type: "article",
      url: `/blog/${slug}`,
      authors: [post.author || "Diogo Matos"],
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
      title: `${post.title || slug} | ${post.project ? "Projects" : "Blog"} | Diogo Matos`,
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
  return (
    <article className="flex flex-col justify-start w-full">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 border-b border-white/20 pb-3 scroll-mt-20 max-w-prose">
        {postInfo.title}
      </h1>
      <div className="flex flex-col lg:flex-row-reverse gap-6 lg:gap-8 w-full">
        <span className="flex flex-col gap-3 justify-between h-fit w-full">
          <div className="flex flex-col gap-3">
            {postInfo.links && (
              <div className="flex gap-4 items-center pb-1">
                {postInfo.links.map((link, idx) => {
                  return (
                    <span
                      key={idx}
                      className="flex space-x-1 items-center justify-center"
                    >
                      <Link size={18} weight="duotone" />
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
            {(postInfo.project || postInfo.tags) && (
              <div className="flex gap-2 flex-wrap items-center">
                {(postInfo.project
                  ? postInfo.project.stack.split(" ")
                  : postInfo.tags
                    ? postInfo.tags.split(" ")
                    : []
                ).map((stack, idx) => {
                  return (
                    <span
                      key={idx}
                      className="text-xs font-light bg-white/10 backdrop-blur-md px-2 py-1 rounded-full border border-white/10 pointer-events-none select-none"
                    >
                      {stack}
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
        <div className="w-full lg:min-w-max">
          <div className="pb-2 w-full">
            <SkeletonImage
              src={postInfo.project?.image || postInfo.image}
              alt={postInfo.alt}
              className="rounded-lg overflow-hidden w-full lg:max-w-prose lg:max-h-[24rem] object-cover shadow-sm"
            />
          </div>
          <div className="max-w-prose">
            <Post />
          </div>
        </div>
      </div>
    </article>
  );
}
