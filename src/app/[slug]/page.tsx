import BackButton from "@/components/back-button";
import Card from "@/components/card";
import fs from "fs";
import path from "path";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = fs.readdirSync(path.join("src/content"));
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
  const { default: Post } = await import(`@/content/${slug}.mdx`);
  return (
    <div className="flex flex-col gap-4">
      <BackButton />
      <Card>
        <Post />
      </Card>
    </div>
  );
}
