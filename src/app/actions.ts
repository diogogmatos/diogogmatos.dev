"use server";

import { unstable_cache } from "next/cache";
import { Post } from "../../tina/__generated__/types";
import client from "../../tina/__generated__/client";

const POSTS_PER_PAGE = parseInt(process.env.POSTS_PER_PAGE || "6", 10);

function searchPosts(posts: Post[], searchQuery: string) {
  if (
    searchQuery.length > 0 &&
    !searchQuery.split("").every((c) => c === " ")
  ) {
    const queryWords = searchQuery
      .toLocaleLowerCase()
      .split(" ")
      .filter((w) => w.trim().length > 0);

    // Score posts by number of matching words
    return posts
      .map((post) => {
        const values = [
          post.title,
          post.description,
          post.project ? post.project.description : "",
          post.project ? post.project.stack : "",
          post.tags !== null ? post.tags : "",
          new Date(post.date).toDateString(),
          new Date(post.date).toLocaleString("pt-PT"),
        ].map((v) => String(v).toLowerCase());

        // Count how many query words match any value
        const matchCount = queryWords.reduce((count, word) => {
          return values.some((value) => value.includes(word))
            ? count + 1
            : count;
        }, 0);

        return { post, matchCount };
      })
      .filter(({ matchCount }) => matchCount > 0)
      .sort((a, b) => b.matchCount - a.matchCount)
      .map(({ post }) => post);
  }
  return posts;
}

export const fetchBlogPosts = async (
  searchQuery: string,
  cursor: number,
  onlyProjects?: boolean,
) =>
  unstable_cache(async () => {
    const results = await client.queries.postConnection({
      sort: "date",
    });
    const allPosts = (results.data.postConnection.edges ?? [])
      .filter((r) => r !== null && r.node)
      .map((r) => r?.node as Post)
      .reverse();
    const filteredPosts = searchPosts(allPosts, searchQuery).filter((p) =>
      onlyProjects ? p.project !== null : true,
    );
    const posts = filteredPosts.slice(
      (cursor - 1) * POSTS_PER_PAGE,
      cursor * POSTS_PER_PAGE,
    );
    const hasNextPage = filteredPosts.length > cursor * POSTS_PER_PAGE;
    return { posts, hasNextPage };
  }, [
    "blogPosts",
    searchQuery,
    cursor.toString(),
    (onlyProjects ?? false).toString(),
  ])();
