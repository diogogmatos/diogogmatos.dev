import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import remarkGfm from "remark-gfm";
import { z } from "zod";

const experiences = defineCollection({
  name: "experiences",
  directory: "src/content/experiences",
  include: "**/*.json",
  parser: "json",
  schema: z.object({
    place: z.string(),
    link: z.string(),
    roles: z.array(
      z.object({
        name: z.string(),
      }),
    ),
    period: z.string(),
    logo: z.string(),
    date: z.string().transform((str) => new Date(str)),
  }),
});

const posts = defineCollection({
  name: "posts",
  directory: "src/content/posts",
  include: "**/*.mdx",
  parser: "frontmatter",
  schema: z.object({
    icon: z.string(),
    title: z.string(),
    summary: z.string(),
    date: z.string().transform((str) => new Date(str)),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    tags: z.array(z.string()).optional(),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm],
    });
    return {
      ...document,
      mdx,
    };
  },
});

const projects = defineCollection({
  name: "projects",
  directory: "src/content/projects",
  include: "**/*.json",
  parser: "json",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    media: z.array(
      z.object({
        src: z.string(),
        type: z.enum(["image", "video"]),
        alt: z.string().optional(),
        addPadding: z.boolean().optional(),
        cover: z.boolean().optional(),
      }),
    ),
    link: z.string(),
  }),
});

export default defineConfig({
  content: [posts, projects, experiences],
});
