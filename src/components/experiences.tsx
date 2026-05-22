import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { clsx } from "clsx";
import Card from "./card";
import AppLink from "./app-link";
import FadeIn from "./animations/fade-in";
import { allExperiences } from "content-collections";

export default function Experiences() {
  return (
    <FadeIn as="section" delay={0.3}>
      <Card>
        <ul className="space-y-3">
          {allExperiences
            .sort((a, b) => (a.date < b.date ? 1 : -1))
            .map((exp, i) => (
              <li
                key={"exp" + i}
                className={clsx(
                  i < (allExperiences.length ?? 0) - 1 &&
                    "pb-3 border-b border-white/10",
                )}
              >
                <span className="w-full flex justify-between gap-6 items-center mb-1">
                  <span className="flex items-center gap-1.5">
                    {exp.logo && (
                      <Image
                        alt={exp.place + " logo"}
                        src={exp.logo}
                        width={40}
                        height={40}
                        className="size-[1.2rem] rounded-full object-cover overflow-hidden max-[385px]:hidden"
                      />
                    )}
                    <AppLink
                      className="font-medium"
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-umami-event={`Experience: ${exp.place}`}
                    >
                      {exp.place}
                      <ArrowUpRight
                        size={14}
                        weight="bold"
                        className="inline-flex translate-x-0.5"
                      />
                    </AppLink>
                  </span>
                  <p className="text-neutral-50/50 text-sm text-nowrap">
                    {exp.period}
                  </p>
                </span>
                <ul className="ml-1.5 text-sm text-neutral-50/90">
                  {exp.roles.map((role, j) => (
                    <li
                      className="before:content-['›'] before:mr-1.5"
                      key={"role" + j}
                    >
                      {role.name}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
        </ul>
      </Card>
    </FadeIn>
  );
}
