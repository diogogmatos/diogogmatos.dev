"use client";

import FadeIn from "@/components/animations/fade-in";
import ProjectShowoff from "@/components/project-showoff";
import { allProjects } from "content-collections";

export default function Projects() {
  return (
    <section className="flex flex-col gap-8 sm:gap-10 my-8 sm:my-10">
      {allProjects.map((project, idx) => (
        <FadeIn as="div" delay={0.9 + idx * 0.1} key={idx}>
          <ProjectShowoff project={project} />
        </FadeIn>
      ))}
    </section>
  );
}
