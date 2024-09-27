import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

interface Position {
  title: string;
  position: string[];
  period: string;
  link?: string;
}

interface ExperienceListProps {
  experiences: Position[];
}

const ExperienceList = ({ experiences }: ExperienceListProps) => {
  return (
    <ul className="list-disc pl-4 space-y-2">
      {experiences.map((e, i) => (
        <li key={"e" + i}>
          <span className="w-full flex justify-between items-center">
            <a
              href={e.link ? e.link : ""}
              target="_blank"
              rel="noopener noreferrer"
              className={`sm:text-lg font-bold ${e.link ? "hover:underline" : "cursor-default"}`}
            >
              {e.title}
              {e.link && (
                <ArrowUpRight
                  size={16}
                  className="inline-flex -translate-y-0.5 translate-x-0.5"
                />
              )}
            </a>
            <p className="text-white/50 text-sm sm:text-base text-nowrap">
              {e.period}
            </p>
          </span>
          <ul className="list-disc pl-4 text-sm sm:text-base">
            {e.position.map((p, j) => (
              <li key={"p" + j}>{p}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default ExperienceList;
