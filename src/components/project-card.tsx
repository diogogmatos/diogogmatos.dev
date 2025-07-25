"use client";

import Card from "./card";
import CardImage from "./card-image";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Markdown from "react-markdown";
import clsx from "clsx";
import Tag from "./tag";
import Link from "next/link";

interface ProjectCardProps {
  image?: {
    src: string;
    alt: string;
  };
  title: string;
  link?: string;
  slug?: string;
  description: string;
  footer?: string;
}

const ProjectCard = ({
  image,
  title,
  link,
  slug,
  description,
  footer,
}: ProjectCardProps) => {
  return (
    <Card innerClassName="p-0" slug={slug}>
      {image && (
        <div className="h-40 rounded-t-2xl overflow-hidden">
          <CardImage src={image.src} alt={image.alt} radius="none" />
        </div>
      )}
      <span className="flex flex-col gap-3 justify-between h-full w-full p-4">
        <div className="flex flex-col gap-3">
          <h1
            className={clsx(
              "text-xl font-bold border-b border-white/20 pb-2 mb-1",
            )}
          >
            {title}
          </h1>
          {footer && (
            <div className="flex flex-wrap gap-2 items-center">
              {footer.split(" ").map((name, idx) => {
                return <Tag key={idx}>{name}</Tag>;
              })}
            </div>
          )}
          <span>
            <Markdown>{description}</Markdown>
          </span>
          {(slug || link) && (
            <Link
              href={slug ? `/blog/${slug}` : link ? link : "#"}
              className="button group w-full flex justify-between items-center"
              {...(!slug &&
                link && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
            >
              Learn more{" "}
              {slug ? (
                <ArrowRight
                  size="1.2em"
                  className="inline-flex group-hover:translate-x-1 transition-transform"
                />
              ) : (
                <ArrowUpRight
                  size="1.2em"
                  className="inline-flex group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              )}
            </Link>
          )}
        </div>
      </span>
    </Card>
  );
};

export default ProjectCard;
