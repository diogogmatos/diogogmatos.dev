import { allPosts } from "content-collections";

// The title of every page by its path, used for the breadcrumbs
export const pageTitles: Record<string, string> = {
  "/": "Home",
  "/blog": "Blog",
  ...Object.fromEntries(
    allPosts.map((post) => [
      `/blog/${post._meta.fileName.split(".")[0]}`,
      post.title,
    ]),
  ),
};
