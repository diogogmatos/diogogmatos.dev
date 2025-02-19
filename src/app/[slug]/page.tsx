import BackButton from "@/components/back-button";
import Card from "@/components/card";
import fs from "fs";
import path from "path";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = fs.readdirSync(path.join("src/content/posts"));
  return posts.map((post) => ({
    slug: post.split(".")[0],
  }));
}

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const { default: Post } = await import(`@/content/posts/${slug}.mdx`);
  return (
    <div className="flex flex-col gap-4">
      <BackButton />
      <Card innerClassName="p-3 sm:p-6">
        <Post />
      </Card>
    </div>
  );
}
