import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselImage,
  CarouselVideo,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Markdown from "./markdown";
import AppLink from "./app-link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Project } from "content-collections";

export default function ProjectShowoff({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <div className="flex flex-col gap-1 sm:gap-1.5 px-2">
        <span className="flex justify-between items-center">
          <h1 className="font-semibold text-lg">{project.title}</h1>
        </span>
        <span className="text-sm text-neutral-50/90 text-pretty">
          <Markdown>{project.description}</Markdown>
        </span>
      </div>
      <div className="flex flex-col gap-4 sm:gap-5">
        <Carousel
          className="w-full"
          opts={{
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 20000 / project.media.length,
            }),
          ]}
        >
          <CarouselContent>
            {project.media.map((media, idx) => (
              <CarouselItem key={idx}>
                {media.type === "image" ? (
                  <CarouselImage
                    src={media.src}
                    alt={media.alt ?? project.title + " image " + idx}
                    addPadding={media.addPadding}
                    cover={media.cover}
                  />
                ) : (
                  <CarouselVideo
                    src={media.src}
                    addPadding={media.addPadding}
                    cover={media.cover}
                  />
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="w-full flex justify-end pr-2">
          <AppLink
            className="font-medium text-sm group after:-bottom-[1px] text-neutral-50/90 hover:text-white transition-colors"
            href={project.link}
            data-umami-event={`Project: ${project.title}`}
          >
            Learn more
            {project.link.includes("https://") ? (
              <ArrowUpRight
                size={14}
                weight="bold"
                className="inline-flex translate-x-0.5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform"
              />
            ) : (
              <ArrowRight
                size={14}
                weight="bold"
                className="inline-flex translate-x-0.5 group-hover:translate-x-1 transition-transform"
              />
            )}
          </AppLink>
        </div>
      </div>
    </div>
  );
}
