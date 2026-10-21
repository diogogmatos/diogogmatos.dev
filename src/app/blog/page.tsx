import BlogPostList from "@/components/blog/blog-post-list";
import SearchBar from "@/components/blog/search-bar";
import { connection } from "next/server";

// Read on the server, since non-NEXT_PUBLIC env vars aren't available on the client
const POSTS_PER_PAGE = parseInt(process.env.POSTS_PER_PAGE || "10", 10);

export default async function Blog() {
  // Render on each request, so results for ?search= are in the server-rendered HTML
  await connection();

  return (
    <main className="flex flex-col gap-4">
      <SearchBar />
      <BlogPostList postsPerPage={POSTS_PER_PAGE} />
    </main>
  );
}
