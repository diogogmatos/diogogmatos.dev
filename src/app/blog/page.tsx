import ControlBar from "@/components/blog/controlbar";
import BlogPostList from "@/components/blog/blog-post-list";
import { PostDataProvider } from "@/providers/post-data-provider";
import { Suspense } from "react";
import { fetchBlogPosts } from "../actions";

export default async function Blog({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const search = (params.search as string) ?? "";
  const onlyProjects = ((params.onlyProjects as string) ?? "false") === "true";
  const { posts, hasNextPage } = await fetchBlogPosts(search, 1, onlyProjects);

  return (
    <PostDataProvider
      initialPosts={posts}
      initialHasNextPage={hasNextPage}
      initialOnlyProjects={
        ((params.onlyProjects as string) ?? "false") === "true"
      }
      initialSearchQuery={(params.search as string) ?? ""}
    >
      <main className="flex flex-col gap-4">
        <Suspense
          fallback={
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl w-full h-[50px] animate-pulse" />
          }
        >
          <ControlBar />
        </Suspense>
        <BlogPostList />
      </main>
    </PostDataProvider>
  );
}
