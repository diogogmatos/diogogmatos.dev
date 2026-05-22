"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { allPosts, Post } from "content-collections";

interface PostDataContextData {
  posts: Post[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  hasNextPage: boolean;
  loadMore: () => void;
}

const PostDataContext = createContext<PostDataContextData | undefined>(
  undefined,
);

const POSTS_PER_PAGE = parseInt(process.env.POSTS_PER_PAGE || "10", 10);

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
          post.summary,
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

const getPosts = (searchQuery: string, cursor: number) => {
  const filteredPosts = searchPosts(allPosts, searchQuery);
  const posts = filteredPosts.slice(
    (cursor - 1) * POSTS_PER_PAGE,
    cursor * POSTS_PER_PAGE,
  );
  const hasNextPage = filteredPosts.length > cursor * POSTS_PER_PAGE;
  return { posts, hasNextPage };
};

export function PostDataProvider({
  initialSearchQuery,
  children,
}: {
  initialSearchQuery: string;
  children: React.ReactNode;
}) {
  const { posts: initialPosts, hasNextPage: initialHasNextPage } = getPosts(
    initialSearchQuery,
    1,
  );
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [hasNextPage, setHasNextPage] = useState<boolean>(initialHasNextPage);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [currentCursor, setCurrentCursor] = useState<number>(1);

  async function loadMore() {
    const { posts: newPosts, hasNextPage: newHasNextPage } = await getPosts(
      searchQuery,
      currentCursor + 1,
    );
    setPosts((prev) => [...(prev ?? []), ...newPosts]);
    setHasNextPage(newHasNextPage);
    setCurrentCursor((prev) => prev + 1);
  }

  useEffect(() => {
    setCurrentCursor(1);
    const { posts, hasNextPage } = getPosts(searchQuery, 1);
    setPosts(posts);
    setHasNextPage(hasNextPage);
  }, [searchQuery]);

  return (
    <PostDataContext.Provider
      value={{
        posts,
        searchQuery,
        setSearchQuery,
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
