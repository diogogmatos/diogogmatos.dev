"use client";

import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { useTina } from "tinacms/dist/react";
import { Sdk } from "../../tina/__generated__/types";
import Image from "next/image";
import { clsx } from "clsx";
import Card from "./card";
import { motion } from "motion/react";
import { useAnimation } from "@/providers/animation-provider";

const ExperienceList = ({
  props,
}: {
  props: Awaited<ReturnType<Sdk["experienceConnection"]>>;
  isEducation?: boolean;
}) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const play = useAnimation();

  return (
    <motion.div
      initial={play ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card>
        <ul className="space-y-3">
          {data.experienceConnection.edges &&
            data.experienceConnection.edges
              .sort((a, b) =>
                a?.node && b?.node && a.node.date && b.node.date
                  ? a.node.date < b.node.date
                    ? 1
                    : -1
                  : 0,
              )
              .map(
                (e, i) =>
                  e?.node && (
                    <li
                      key={"e" + i}
                      className={clsx(
                        i <
                          (data.experienceConnection.edges?.length ?? 0) - 1 &&
                          "pb-3 border-b border-white/10",
                      )}
                    >
                      <span className="w-full flex justify-between gap-6 items-center mb-1">
                        <span className="flex items-center gap-1.5">
                          {e.node.image && (
                            <Image
                              alt={`${e.node.title} Logo`}
                              src={e.node.image}
                              width={80}
                              height={80}
                              className="size-[1.2rem] rounded-full object-cover overflow-hidden max-[385px]:hidden"
                            />
                          )}
                          <a
                            href={e.node.link ? e.node.link : ""}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`font-medium ${e.node.link ? "hover:underline" : "cursor-default"}`}
                            data-umami-event={`Experience: ${e.node.title}`}
                          >
                            {e.node.title}
                            {e.node.link && (
                              <ArrowUpRight
                                size={14}
                                weight="bold"
                                className="inline-flex -translate-y-0.5 translate-x-0.5"
                              />
                            )}
                          </a>
                        </span>
                        <p className="text-neutral-50/50 text-sm text-nowrap">
                          {e.node.period}
                        </p>
                      </span>
                      <ul className="ml-1.5 text-sm text-neutral-50/90">
                        {e.node.positions.map((p, j) => (
                          <li
                            className="before:content-['›'] before:mr-1.5"
                            key={"p" + j}
                          >
                            {p.title}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ),
              )}
        </ul>
      </Card>
    </motion.div>
  );
};

export default ExperienceList;
