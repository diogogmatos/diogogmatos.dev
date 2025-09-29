import ControlBar from "@/components/blog/controlbar";
import BlogPostList from "@/components/blog/blog-post-list";
import { PostDataProvider } from "@/providers/post-data-provider";
import client from "../../../tina/__generated__/client";
import { Post } from "../../../tina/__generated__/types";
import { Suspense } from "react";

export default async function Blog() {
  const postsResponse = await client.queries.postConnection();
  const posts = (postsResponse.data.postConnection.edges ?? [])
    .filter((r) => r !== null && r.node)
    .map((r) => r?.node as Post)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <PostDataProvider posts={posts}>
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
