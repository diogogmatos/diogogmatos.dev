import { allPosts } from "content-collections";

// Newest first, also used as the tiebreaker for search results
const postsByDate = [...allPosts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

// Ranks posts by how many of the query's words match their title, summary, tags or date
export function searchPosts(query: string) {
  const words = query.toLowerCase().split(" ").filter(Boolean);
  if (words.length === 0) return postsByDate;

  return postsByDate
    .map((post) => {
      const values = [
        post.title,
        post.summary,
        post.tags?.join(" ") ?? "",
        new Date(post.date).toDateString(),
        new Date(post.date).toLocaleString("pt-PT"),
      ].map((value) => value.toLowerCase());
      const matches = words.filter((word) =>
        values.some((value) => value.includes(word)),
      ).length;
      return { post, matches };
    })
    .filter(({ matches }) => matches > 0)
    .sort((a, b) => b.matches - a.matches)
    .map(({ post }) => post);
}
