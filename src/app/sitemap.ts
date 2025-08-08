import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = fs.readdirSync(path.join("src/content/posts"));
  const postsSlugs = posts
    .filter((filename) => filename.includes("mdx"))
    .map((post) => post.split(".")[0]);

  const links = postsSlugs
    ? postsSlugs.map((p) => {
        return {
          url: `https://diogogmatos.dev/blog/${p}`,
        };
      })
    : [];

  return [
    {
      url: "https://diogogmatos.dev",
    },
    ...links,
  ];
}
