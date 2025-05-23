"use client";

import Card from "@/components/card";
import client from "../../../tina/__generated__/client";
import {
  ArrowRight,
  Joystick,
  MagnifyingGlass,
} from "@phosphor-icons/react/dist/ssr";
import { useEffect, useState } from "react";
import { Post } from "../../../tina/__generated__/types";
import Markdown from "react-markdown";
import SkeletonImage from "@/components/skeleton-image";
import { motion } from "motion/react";
import Link from "next/link";
import clsx from "clsx";

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

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [onlyProjects, setOnlyProjects] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

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

  useEffect(() => {
    if (onlyProjects)
      setFilteredPosts(
        searchPosts(posts, searchQuery).filter((post) => post.project),
      );
    else setFilteredPosts(searchPosts(posts, searchQuery));
  }, [searchQuery, posts, onlyProjects]);

  const [placeholderText, setPlaceholderText] =
    useState<string>("Search by title...");
  const [fadeOut, setFadeOut] = useState<boolean>(false);

  useEffect(() => {
    setInterval(() => {
      setFadeOut(true);
      setTimeout(() => {
        setPlaceholderText((prev) => {
          const currentIndex = placeholders.indexOf(prev);
          const nextIndex =
            currentIndex === placeholders.length - 1 ? 0 : currentIndex + 1;
          return placeholders[nextIndex];
        });
      }, 500);
      setTimeout(() => {
        setFadeOut(false);
      }, 1000);
    }, 5000);
  }, []);

  return (
    <main className="flex flex-col gap-4">
      <div className="flex items-center gap-4 w-full">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl w-full py-3 px-4">
          <span className="flex items-center gap-4">
            <MagnifyingGlass className="inline-flex" size="1.2em" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="search"
              className={clsx(
                "w-full bg-transparent outline-none text-sm sm:text-base placeholder:text-white/50 transition-opacity ease-in-out duration-500",
                fadeOut && searchQuery.length === 0
                  ? "opacity-0"
                  : "opacity-100",
              )}
              placeholder={placeholderText}
            />
          </span>
        </div>
        <button
          onClick={() => setOnlyProjects(!onlyProjects)}
          className={clsx(
            onlyProjects
              ? "bg-blue-500/90 hover:bg-blue-500/90"
              : "bg-white/5 hover:bg-white/10",
            "min-w-fit px-4 py-3 text-sm sm:text-base rounded-2xl backdrop-blur-md border border-white/10 hover:border-white/20 active:scale-95 font-medium hover:shadow-lg transition-all",
          )}
        >
          Project <Joystick size="1.2em" className="inline-flex" />
        </button>
      </div>
      <ul className="grid gap-4">
        {posts.length === 0 &&
          Array.from({ length: 3 }, (_, i) => i).map((_, idx) => (
            <li key={idx}>
              <Card innerClassName="p-4 sm:p-5" className="animate-pulse">
                <div className="h-72" />
              </Card>
            </li>
          ))}
        {filteredPosts.length === 0 && posts.length > 0 && (
          <p className="w-full text-center">No results.</p>
        )}
        {filteredPosts.length > 0 &&
          filteredPosts.map((post, idx) => (
            <motion.li
              key={idx}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.2 }}
            >
              <Card
                innerClassName="p-4 sm:p-5"
                className="hover:shadow-flush hover:shadow-white/15 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row-reverse gap-5 lg:gap-6 items-start w-full lg:h-72">
                  <span className="flex flex-col gap-3 justify-between h-full w-full">
                    <div className="flex flex-col gap-3">
                      <h1 className="text-xl sm:text-2xl font-bold border-b border-white/20 pb-2 mb-1">
                        {post.title}
                      </h1>
                      {(post.project || post.tags) && (
                        <div className="flex gap-2 flex-wrap items-center">
                          {(post.project
                            ? post.project.stack.split(" ")
                            : post.tags
                              ? post.tags.split(" ")
                              : []
                          ).map((stack, idx) => {
                            return (
                              <span
                                key={idx}
                                className="text-xs font-light bg-white/10 backdrop-blur-md px-2 py-1 rounded-full border border-white/10 pointer-events-none select-none"
                              >
                                {stack}
                              </span>
                            );
                          })}
                        </div>
                      )}
                      <span className="sm:line-clamp-4">
                        <Markdown>
                          {post.project?.description || post.description}
                        </Markdown>
                      </span>
                    </div>
                    <div className="flex flex-col md:flex-row gap-5 items-start md:items-center justify-between">
                      <span className="text-sm font-light">
                        <p>
                          by{" "}
                          <strong className="font-medium">{post.author}</strong>
                        </p>
                        <p className="text-xs mt-1">
                          {new Date(post.date).toLocaleString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: false,
                          })}
                        </p>
                      </span>
                      <Link
                        href={`/blog/${post._sys.filename}`}
                        className="button group w-full flex justify-between items-center md:block md:w-auto"
                      >
                        Read more{" "}
                        <ArrowRight
                          size="1.2em"
                          className="inline-flex group-hover:translate-x-1 transition-transform"
                        />
                      </Link>
                    </div>
                  </span>
                  <SkeletonImage
                    src={post.project?.image || post.image}
                    alt={post.alt}
                    className="rounded-lg overflow-hidden lg:max-w-md h-full object-cover shadow-sm"
                  />
                </div>
              </Card>
            </motion.li>
          ))}
      </ul>
    </main>
  );
}
