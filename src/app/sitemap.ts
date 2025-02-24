import type { MetadataRoute } from "next";
import client from "../../tina/__generated__/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = (await client.queries.projectConnection()).data
    .projectConnection.edges;
  const posts = projects
    ? projects
        .map((p) => {
          const project = p?.node;
          if (project && project.post)
            return {
              url: `https://diogogmatos.dev/${project.post._sys.filename}`,
              priority: 1 - (project.relevance - 1) / (projects.length - 1),
            };
        })
        .filter((p) => p !== undefined)
    : [];

  return [
    {
      url: "https://diogogmatos.dev",
    },
    ...posts,
  ];
}
