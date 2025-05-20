import type { MetadataRoute } from "next";
import client from "../../tina/__generated__/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = (await client.queries.postConnection()).data.postConnection
    .edges;
  const links = posts
    ? posts
        .map((p) => {
          const post = p?.node;
          if (post)
            return {
              url: `https://diogogmatos.dev/blog/${post._sys.filename}`,
            };
        })
        .filter((p) => p !== undefined)
    : [];

  return [
    {
      url: "https://diogogmatos.dev",
    },
    ...links,
  ];
}
