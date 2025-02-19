import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "src/content/posts",
        format: "mdx",
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            required: true,
          },
        ],
      },
      {
        name: "project",
        label: "Projects",
        path: "src/content/projects",
        format: "json",
        fields: [
          {
            type: "image",
            name: "image",
            label: "Image",
            required: true,
          },
          {
            type: "string",
            name: "alt",
            label: "Image Alt",
            required: true,
          },
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
          },
          {
            type: "string",
            name: "link",
            label: "Link",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
          },
          {
            type: "string",
            name: "stack",
            label: "Stack",
            required: true,
          },
          {
            type: "number",
            name: "relevance",
            label: "Relevance",
            required: true,
          },
          {
            type: "reference",
            collections: ["post"],
            name: "post",
            label: "Post",
            required: false,
          },
        ],
        ui: {
          router: () => "/",
        },
      },
      {
        name: "experience",
        label: "Experience",
        path: "src/content/experience",
        format: "json",
        fields: [
          {
            type: "boolean",
            name: "isEducation",
            label: "Education Position?",
          },
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
          },
          {
            type: "object",
            list: true,
            name: "positions",
            label: "Positions",
            required: true,
            fields: [
              {
                type: "string",
                name: "title",
                label: "Position Title",
                required: true,
              },
            ],
            ui: {
              itemProps: (item) => ({ label: item.title }),
            },
          },
          {
            type: "string",
            name: "period",
            label: "Period",
            required: true,
          },
          {
            type: "string",
            name: "link",
            label: "Link",
          },
          {
            type: "string",
            name: "relevance",
            label: "Relevance",
            required: true,
          },
        ],
        ui: {
          router: () => "/",
        },
      },
    ],
  },
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN,
    },
  },
});
