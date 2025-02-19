"use client";

import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { useTina } from "tinacms/dist/react";
import { Sdk } from "../../tina/__generated__/types";

const ExperienceList = ({
  props,
  isEducation,
}: {
  props: Awaited<ReturnType<Sdk["experienceConnection"]>>;
  isEducation?: boolean;
}) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <ul className="list-disc pl-4 space-y-2">
      {data.experienceConnection.edges &&
        data.experienceConnection.edges.map(
          (e, i) =>
            e?.node &&
            (isEducation ? e.node.isEducation : !e.node.isEducation) && (
              <li key={"e" + i}>
                <span className="w-full flex justify-between gap-6 items-center">
                  <a
                    href={e.node.link ? e.node.link : ""}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`sm:text-lg font-bold ${e.node.link ? "hover:underline" : "cursor-default"}`}
                  >
                    {e.node.title}
                    {e.node.link && (
                      <ArrowUpRight
                        size={16}
                        className="inline-flex -translate-y-0.5 translate-x-0.5"
                      />
                    )}
                  </a>
                  <p className="text-white/50 text-sm sm:text-base text-nowrap">
                    {e.node.period}
                  </p>
                </span>
                <ul className="list-disc pl-4 text-sm sm:text-base">
                  {e.node.positions.map((p, j) => (
                    <li key={"p" + j}>{p.title}</li>
                  ))}
                </ul>
              </li>
            ),
        )}
    </ul>
  );
};

export default ExperienceList;
