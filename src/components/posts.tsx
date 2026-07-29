import FadeIn from "./animations/fade-in";
import { allPosts, allProjects } from "content-collections";
import BlogPostCard from "./blog-post-card";

export default function Posts() {
  return (
    <section className="flex flex-col gap-8 sm:gap-10">
      <FadeIn
        as="h1"
        blurred
        delay={0.6 + allProjects.length * 0.1}
        className="font-primary text-2xl sm:text-3xl pl-2"
      >
        Posts
      </FadeIn>
      <ul className="grid gap-4">
        {allPosts.map((post, idx) => (
          <FadeIn
            as="li"
            delay={0.7 + allProjects.length * 0.1 + idx * 0.1}
            key={idx}
          >
            <BlogPostCard post={post} />
          </FadeIn>
        ))}
      </ul>
    </section>
  );
}
