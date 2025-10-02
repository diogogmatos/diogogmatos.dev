"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Post } from "../../tina/__generated__/types";
import { fetchBlogPosts } from "@/app/actions";

interface PostDataContextData {
  posts: Post[] | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onlyProjects: boolean;
  setOnlyProjects: (onlyProjects: boolean) => void;
  hasNextPage: boolean;
  loadMore: () => void;
}

const PostDataContext = createContext<PostDataContextData | undefined>(
  undefined,
);

export function PostDataProvider({
  initialSearchQuery,
  initialOnlyProjects,
  initialPosts,
  initialHasNextPage,
  children,
}: {
  initialSearchQuery: string;
  initialOnlyProjects: boolean;
  initialPosts: Post[];
  initialHasNextPage: boolean;
  children: React.ReactNode;
}) {
  const [posts, setPosts] = useState<Post[] | null>(initialPosts);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [onlyProjects, setOnlyProjects] =
    useState<boolean>(initialOnlyProjects);
  const [currentCursor, setCurrentCursor] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(initialHasNextPage);

  async function loadMore() {
    const { posts: newPosts, hasNextPage: newHasNextPage } =
      await fetchBlogPosts(searchQuery, currentCursor + 1, onlyProjects);
    setPosts((prev) => [...(prev ?? []), ...newPosts]);
    setHasNextPage(newHasNextPage);
    setCurrentCursor((prev) => prev + 1);
  }

  useEffect(() => {
    setPosts(null);
    setCurrentCursor(1);
    fetchBlogPosts(searchQuery, 1, onlyProjects).then(
      ({ posts, hasNextPage }) => {
        setPosts(posts);
        setHasNextPage(hasNextPage);
      },
    );
  }, [searchQuery, onlyProjects]);

  return (
    <PostDataContext.Provider
      value={{
        posts,
        searchQuery,
        setSearchQuery,
        onlyProjects,
        setOnlyProjects,
        hasNextPage,
        loadMore,
      }}
    >
      {children}
    </PostDataContext.Provider>
  );
}

export function usePostData(): PostDataContextData {
  const context = useContext(PostDataContext);
  if (context === undefined) {
    throw new Error("usePostData() must be used within a PostDataProvider");
  }
  return { ...context };
}
