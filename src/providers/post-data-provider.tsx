"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Post } from "../../tina/__generated__/types";

interface PostDataContextData {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onlyProjects: boolean;
  setOnlyProjects: (onlyProjects: boolean) => void;
  filteredPosts: Post[];
  posts: Post[];
}

const PostDataContext = createContext<PostDataContextData | undefined>(
  undefined,
);

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

export function PostDataProvider({
  posts,
  children,
}: {
  posts: Post[];
  children: React.ReactNode;
}) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [onlyProjects, setOnlyProjects] = useState<boolean>(false);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);

  useEffect(() => {
    if (onlyProjects)
      setFilteredPosts(
        searchPosts(posts, searchQuery).filter((post) => post.project),
      );
    else setFilteredPosts(searchPosts(posts, searchQuery));
  }, [searchQuery, posts, onlyProjects]);

  return (
    <PostDataContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        onlyProjects,
        setOnlyProjects,
        filteredPosts,
        posts,
      }}
    >
      {children}
    </PostDataContext.Provider>
  );
}

export function useControlBar(): PostDataContextData {
  const context = useContext(PostDataContext);
  if (context === undefined) {
    throw new Error("useControlBar() must be used within a ControlBarProvider");
  }
  return { ...context };
}
