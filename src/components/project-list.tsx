"use client";

import { useTina } from "tinacms/dist/react";
import { Sdk } from "../../tina/__generated__/types";
import { Project } from "../../tina/__generated__/types";
import ProjectCard from "./project-card";
import { getArrayColumn } from "@/lib/utils";
import { Spinner } from "@phosphor-icons/react/dist/ssr";

export default function ProjectList({
  props,
}: {
  props: Awaited<ReturnType<Sdk["projectConnection"]>>;
}) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const projects = (data.projectConnection.edges ?? [])
    .filter((p) => p !== null && p.node)
    .map((p) => p?.node as Project)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return projects.length > 0 ? (
    <>
      <div className="hidden lg:grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-4">
          {getArrayColumn(projects, 0, 3).map((project, idx) => (
            <ProjectCard
              key={idx}
              image={{
                src: project.image,
                alt: project.alt,
              }}
              title={project.title}
              link={project.link}
              description={project.description}
              footer={project.stack}
              slug={project.post?._sys.filename}
            />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {getArrayColumn(projects, 1, 3).map((project, idx) => (
            <ProjectCard
              key={idx}
              image={{
                src: project.image,
                alt: project.alt,
              }}
              title={project.title}
              link={project.link}
              description={project.description}
              footer={project.stack}
              slug={project.post?._sys.filename}
            />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {getArrayColumn(projects, 2, 3).map((project, idx) => (
            <ProjectCard
              key={idx}
              image={{
                src: project.image,
                alt: project.alt,
              }}
              title={project.title}
              link={project.link}
              description={project.description}
              footer={project.stack}
              slug={project.post?._sys.filename}
            />
          ))}
        </div>
      </div>
      <div className="hidden md:grid lg:hidden grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          {getArrayColumn(projects, 0, 2).map((project, idx) => (
            <ProjectCard
              key={idx}
              image={{
                src: project.image,
                alt: project.alt,
              }}
              title={project.title}
              link={project.link}
              description={project.description}
              footer={project.stack}
              slug={project.post?._sys.filename}
            />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {getArrayColumn(projects, 1, 2).map((project, idx) => (
            <ProjectCard
              key={idx}
              image={{
                src: project.image,
                alt: project.alt,
              }}
              title={project.title}
              link={project.link}
              description={project.description}
              footer={project.stack}
              slug={project.post?._sys.filename}
            />
          ))}
        </div>
      </div>
      <div className="grid gap-4 md:hidden">
        {projects.map((project, idx) => (
          <ProjectCard
            key={idx}
            image={{
              src: project.image,
              alt: project.alt,
            }}
            title={project.title}
            link={project.link}
            description={project.description}
            footer={project.stack}
            slug={project.post?._sys.filename}
          />
        ))}
      </div>
    </>
  ) : (
    <div className="flex items-center justify-center w-full">
      <Spinner size="1.5em" className="animate-spin" />
    </div>
  );
}
