"use client";

import Card from "@/components/card";
import client from "../../../tina/__generated__/client";
import {
  GridFour,
  Joystick,
  Rows,
  Spinner,
} from "@phosphor-icons/react/dist/ssr";
import { Suspense, useEffect, useLayoutEffect, useState } from "react";
import { Post } from "../../../tina/__generated__/types";
import { motion } from "motion/react";
import clsx from "clsx";
import BlogPostCard from "@/components/blog-post-card";
import SearchBar from "@/components/search-bar";
import { useRouter, useSearchParams } from "next/navigation";
import { getArrayColumn } from "@/lib/utils";
import { useWidth } from "@/providers/width-provider";

function searchPosts(posts: Post[], searchQuery: string) {
  if (
    searchQuery.length > 0 &&
    !searchQuery.split("").every((c) => c === " ")
  ) {
    const queryWords = searchQuery.toLocaleLowerCase().split(" ");
    return posts.filter((post) => {
      for (const value of [
        post.title,
        post.description,
        post.project ? post.project.description : "",
        post.project ? post.project.stack : "",
        post.tags !== null ? post.tags : "",
        post.author,
        new Date(post.date).toDateString(),
        new Date(post.date).toLocaleString("pt-PT"),
      ]) {
        if (
          queryWords.every((word) => String(value).toLowerCase().includes(word))
        )
          return true;
      }
      return false;
    });
  }
  return posts;
}

const placeholders = [
  "Search by title...",
  "Search by description...",
  "Search by topic...",
  "Search by tag...",
  "Search by date...",
];

function ControlBar({
  searchQuery,
  setSearchQuery,
  onlyProjects,
  setOnlyProjects,
  gridView,
  setGridView,
  posts,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onlyProjects: boolean;
  setOnlyProjects: (onlyProjects: boolean) => void;
  gridView: boolean;
  setGridView: (gridView: boolean) => void;
  posts: Post[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const width = useWidth();

  // Initialize state based on URL search parameters
  useLayoutEffect(() => {
    const view = searchParams.get("view") ?? "list";
    setGridView(view === "grid");
    const onlyProjects = searchParams.get("onlyProjects") ?? "false";
    setOnlyProjects(onlyProjects === "true");
    const search = searchParams.get("search") ?? "";
    setSearchQuery(search);
  }, [searchParams, setGridView, setOnlyProjects, setSearchQuery]);

  // Update URL search parameters when state changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (gridView) params.set("view", "grid");
    else params.set("view", "list");
    if (onlyProjects) params.set("onlyProjects", "true");
    else params.set("onlyProjects", "false");
    if (searchQuery) params.set("search", searchQuery);
    router.replace(`?${params.toString()}`);
  }, [gridView, onlyProjects, searchQuery, router]);

  useLayoutEffect(() => {
    if (width < 1024 && gridView) {
      setGridView(false);
    }
  }, [width, gridView, setGridView]);

  useLayoutEffect(() => {
    if (width >= 1024 && !gridView && searchParams.get("view") === null) {
      setGridView(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex items-center gap-4 w-full">
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholders={placeholders}
      />
      {posts.some((p) => !p.project) && (
        <button
          onClick={() => setOnlyProjects(!onlyProjects)}
          className={clsx(
            onlyProjects
              ? "bg-blue-500/90 hover:bg-blue-500/90 hover:border-white/30"
              : "bg-white/5 hover:bg-white/10 hover:border-white/20",
            "min-w-fit px-4 py-3 text-sm sm:text-base rounded-2xl backdrop-blur-md border border-white/10 active:scale-95 font-medium hover:shadow-lg transition-all",
          )}
        >
          Projects <Joystick size="1.2em" className="inline-flex" />
        </button>
      )}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-1 hidden lg:flex items-center gap-1">
        <button
          className={clsx(
            !gridView
              ? "bg-blue-500/90 hover:bg-blue-500/90 hover:border-white/30"
              : "bg-white/5 hover:bg-white/10 hover:border-white/20",
            "p-[0.55rem] rounded-xl transition-colors",
          )}
          onClick={() => setGridView(false)}
        >
          <Rows size="1.4em" />
        </button>
        <button
          className={clsx(
            gridView
              ? "bg-blue-500/90 hover:bg-blue-500/90 hover:border-white/30"
              : "bg-white/5 hover:bg-white/10 hover:border-white/20",
            "p-[0.55rem] rounded-xl transition-colors",
          )}
          onClick={() => setGridView(true)}
        >
          <GridFour size="1.4em" />
        </button>
      </div>
    </div>
  );
}

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [onlyProjects, setOnlyProjects] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [gridView, setGridView] = useState<boolean>(false);

  // Fetch posts from TinaCMS on initial render
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await client.queries
        .postConnection()
        .then((res) => res.data.postConnection.edges);
      if (response) {
        const r = response
          .filter((r) => r !== null && r.node)
          .map((r) => r?.node as Post)
          .sort((a, b) => (a.date < b.date ? 1 : -1));
        setPosts(r);
        setFilteredPosts(r);
      }
    };
    fetchPosts();
  }, []);

  // Filter posts based on search query and onlyProjects flag
  useEffect(() => {
    if (onlyProjects)
      setFilteredPosts(
        searchPosts(posts, searchQuery).filter((post) => post.project),
      );
    else setFilteredPosts(searchPosts(posts, searchQuery));
  }, [searchQuery, posts, onlyProjects]);

  return (
    <main className="flex flex-col gap-4">
      <Suspense
        fallback={
          <div className="flex items-center justify-center w-full">
            <Spinner size="1.5em" className="animate-spin" />
          </div>
        }
      >
        <ControlBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onlyProjects={onlyProjects}
          setOnlyProjects={setOnlyProjects}
          gridView={gridView}
          setGridView={setGridView}
          posts={posts}
        />
      </Suspense>
      {filteredPosts.length === 0 && posts.length > 0 && (
        <p className="w-full text-center p-4">No results.</p>
      )}
      <ul className="grid gap-4">
        {posts.length === 0 &&
          Array.from({ length: 3 }, (_, i) => i).map((_, idx) => (
            <li key={idx}>
              <Card innerClassName="p-4 sm:p-5" className="animate-pulse">
                <div className="h-72" />
              </Card>
            </li>
          ))}
      </ul>
      <ul className={clsx("grid gap-4", gridView && "grid-cols-2")}>
        {/* Render a list view */}
        {!gridView &&
          filteredPosts.length > 0 &&
          filteredPosts.map((post, idx) => (
            <motion.li
              key={idx}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.2 }}
            >
              <BlogPostCard post={post} mobileOnly={gridView} />
            </motion.li>
          ))}
        {/* Render a masonry grid view */}
        {gridView && filteredPosts.length > 0 && (
          <>
            <div className="flex flex-col gap-4">
              {getArrayColumn(filteredPosts, 0, 2).map((post, idx) => (
                <motion.li
                  key={idx}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: idx * 0.1, duration: 0.2 }}
                >
                  <BlogPostCard post={post} mobileOnly={gridView} />
                </motion.li>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              {getArrayColumn(filteredPosts, 1, 2).map((post, idx) => (
                <motion.li
                  key={idx}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: idx * 0.1, duration: 0.2 }}
                >
                  <BlogPostCard post={post} mobileOnly={gridView} />
                </motion.li>
              ))}
            </div>
          </>
        )}
      </ul>
    </main>
  );
}
