import FadeIn from "@/components/animations/fade-in";
import { allPosts, allProjects } from "content-collections";
import BlogPostCard from "@/components/blog-post-card";
import AppLink from "@/components/app-link";

// How many posts the home page shows, the rest are on the blog
const HOME_POSTS = 4;

// Posts that are already linked from a project above them
const projectLinks = new Set(allProjects.map((project) => project.link));

export default function Posts() {
  const posts = allPosts
    .filter(
      (post) => !projectLinks.has(`/blog/${post._meta.fileName.split(".")[0]}`),
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, HOME_POSTS);

  return (
    <section className="flex flex-col gap-8 sm:gap-10">
      <FadeIn
        as="h1"
        blurred
        delay={1.2 + allProjects.length * 0.1}
        className="font-primary text-2xl sm:text-3xl pl-2"
      >
        Posts
      </FadeIn>
      <div className="flex flex-col gap-4 sm:gap-5">
        <ul className="grid gap-4">
          {posts.map((post, idx) => (
            <FadeIn
              as="li"
              delay={1.5 + allProjects.length * 0.1 + idx * 0.1}
              key={idx}
            >
              <BlogPostCard post={post} />
            </FadeIn>
          ))}
        </ul>
        <FadeIn
          as="div"
          delay={1.5 + allProjects.length * 0.1 + posts.length * 0.1}
          className="w-full flex justify-end pr-2"
        >
          <AppLink
            className="font-medium text-sm group text-neutral-50/85 hover:text-neutral-50"
            href="/blog"
            data-umami-event="All posts"
          >
            All posts →
          </AppLink>
        </FadeIn>
      </div>
    </section>
  );
}
