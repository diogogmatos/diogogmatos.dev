import BlogPostList from "@/components/blog/blog-post-list";
import { PostDataProvider } from "@/providers/post-data-provider";
import SearchBar from "@/components/blog/search-bar";

export default async function Blog({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const search = (params.search as string) ?? "";

  return (
    <PostDataProvider initialSearchQuery={search}>
      <main className="flex flex-col gap-4">
        <SearchBar />
        <BlogPostList />
      </main>
    </PostDataProvider>
  );
}
