"use client";

import { useTina } from "tinacms/dist/react";
import { Sdk } from "../../tina/__generated__/types";
import ProjectCard from "./project-card";

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

  return (
    <>
      {data.projectConnection.edges &&
        data.projectConnection.edges.map(
          (project, idx) =>
            project?.node && (
              <ProjectCard
                key={idx}
                image={{
                  src: project.node.image,
                  alt: project.node.alt,
                }}
                title={project.node.title}
                link={project.node.link}
                description={project.node.description}
                footer={project.node.stack}
                slug={project.node.title}
              />
            ),
        )}
    </>
  );
}
