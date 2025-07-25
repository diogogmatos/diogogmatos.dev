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
        label: "Blog Posts",
        path: "src/content/posts",
        format: "json",
        fields: [
          {
            type: "reference",
            collections: ["project"],
            name: "project",
            label: "Project",
            description: "If linked to a project, its description and tags will automatically be added to the post",
            required: false,
          },
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
            name: "description",
            label: "Description",
            required: true,
          },
          {
            type: "string",
            name: "author",
            label: "Author",
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
            ui: {
              timeFormat: "HH:mm",
            },
          },
          {
            type: "object",
            name: "links",
            label: "Links",
            list: true,
            required: false,
            fields: [
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
            ],
            ui: {
              itemProps: (item) => ({ label: item.title }),
            },
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            description: "Space separated list of tags",
            required: false,
          }
        ],
        ui: {
          router: (item) => "/blog/" + item.document._sys.filename,
        },
      },
      {
        name: "bodys",
        label: "Blog Post Bodys",
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
            description: "Space separated list of technologies",
            required: true,
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured",
            description: "Dictates if the project is featured in the home page",
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
            ui: {
              timeFormat: "HH:mm",
            },
          },
          {
            type: "reference",
            collections: ["post"],
            name: "post",
            label: "Post",
            description: "This will be used to link the project to the associated post",
            required: false,
          }
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
