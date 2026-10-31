import { Metadata } from "next";
import fs from "fs";
import path from "path";
import Markdown from "@/components/markdown";
import MDX from "@/components/mdx";
import Image from "next/image";
import { allPosts } from "content-collections";
import { customComponents } from "@/mdx-components";
import ReactionPicker from "@/components/reaction-picker";
import Reactions from "@/components/reactions";
import { ReactionsProvider } from "@/components/reactions-provider";
import ShareButton from "@/components/share-button";

export const dynamicParams = false;

const COVER_WIDTH = 600;

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
  const ogImageUrl = `/api/og?title=${encodeURIComponent(post?.title || slug)}&description=${encodeURIComponent("diogogmatos.dev/blog")}${post?.cover ? `&image=${encodeURIComponent(post.cover)}` : ""}`;

  return {
    title: `${post?.title || slug} | Diogo Matos`,
    description: post?.plainSummary,
    keywords: post?.tags,
    authors: [{ name: "Diogo Matos" }],
    openGraph: {
      title: `${post?.title || slug} | Diogo Matos`,
      description: post?.plainSummary,
      type: "article",
      url: `/blog/${slug}`,
      authors: ["Diogo Matos"],
      publishedTime: post?.date ? new Date(post.date).toISOString() : undefined,
      tags: post?.tags,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post?.coverAlt || post?.title || slug,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post?.title || slug} | Diogo Matos`,
      description: post?.plainSummary || undefined,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post?.coverAlt || post?.title || slug,
        },
      ],
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

  return (
    <ReactionsProvider slug={slug}>
      <article className="flex flex-col gap-2 justify-start w-full">
        <section className="flex flex-col gap-3 sm:gap-4">
          {/* Title */}
          <h1 className="relative text-2xl sm:text-3xl font-primary">
            {post.title}
          </h1>
          {/* Description */}
          <Markdown
            components={{
              p: ({ children }) => (
                <p className="text-sm text-pretty text-neutral-50/90">
                  {children}
                </p>
              ),
            }}
          >
            {post.summary}
          </Markdown>
          {/* Meta Info */}
          <ul className="flex gap-3 sm:gap-4 flex-wrap items-center text-xs sm:text-sm text-neutral-50/90">
            <li className="flex items-center gap-1.5">
              <ShareButton title={post.title} />
              <ReactionPicker />
            </li>
          </ul>
          {/* Image */}
          {post.cover && post.coverDimensions && (
            <figure className="w-full mt-2">
              <Image
                src={post.cover}
                // The width it's asked for in, which sets the sizes it's downloaded in, and the
                // height that keeps its shape, so it takes up the right space before it loads.
                // Not rounded, since that would change its shape a little
                width={COVER_WIDTH}
                height={
                  (COVER_WIDTH * post.coverDimensions.height) /
                  post.coverDimensions.width
                }
                alt={post.coverAlt || post.title}
                className="rounded-lg"
                // It's at the top of the post, usually the biggest thing on screen when it opens
                loading="eager"
                fetchPriority="high"
              />
            </figure>
          )}
        </section>
        {/* Content */}
        <section className="text-pretty">
          <MDX code={post.mdx} components={customComponents} />
        </section>
        <Reactions />
      </article>
    </ReactionsProvider>
  );
}
