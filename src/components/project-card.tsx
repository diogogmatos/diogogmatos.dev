"use client";

import Card from "./card";
import CardImage from "./card-image";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Markdown from "react-markdown";
import clsx from "clsx";
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
}: ProjectCardProps) => {
  return (
    <Card innerClassName="p-0">
      {image && (
        <div className="h-40 rounded-t-xl overflow-hidden">
          <CardImage src={image.src} alt={image.alt} radius="none" />
        </div>
      )}
      <span className="flex flex-col gap-3 justify-between w-full p-4">
        <div className="flex flex-col gap-3">
          <h1 className={clsx("text-lg font-semibold")}>{title}</h1>
          <span className="text-sm text-balance text-neutral-50/90">
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
              data-umami-event={`Project: ${title}`}
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
