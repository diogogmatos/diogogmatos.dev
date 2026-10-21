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
import { Project } from "content-collections";
import { cn } from "@/lib/utils";

export default function ProjectShowoff({ project }: { project: Project }) {
  const respectsVideo = project.media.some(
    (media) => media.type === "video" && media.respect,
  );

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <div className="flex flex-col gap-1 sm:gap-1.5 px-2">
        <span className="flex justify-between items-center">
          <h1 className="font-semibold text-lg">{project.title}</h1>
        </span>
        <Markdown
          components={{
            p: ({ children }) => (
              <p className="text-sm text-neutral-50/90 text-pretty">
                {children}
              </p>
            ),
          }}
        >
          {project.description}
        </Markdown>
      </div>
      <div className="flex flex-col gap-4 sm:gap-5">
        <Carousel
          className="w-full"
          opts={{
            loop: true,
          }}
          plugins={[
            Autoplay({
              stopOnInteraction: false,
              delay: (snapList) =>
                snapList.map(
                  (_, idx) =>
                    (project.media[idx].duration ?? 5 + Math.random() * 3) *
                    1000,
                ),
            }),
          ]}
        >
          <CarouselContent>
            {project.media.map((media, idx) => (
              <CarouselItem
                key={idx}
                className={cn(
                  respectsVideo && "max-h-none",
                  respectsVideo && !media.respect && "[contain:size]",
                )}
              >
                {media.type === "image" ? (
                  <CarouselImage
                    key={idx}
                    src={media.src}
                    alt={media.alt ?? project.title + " image " + idx}
                    addPadding={media.addPadding}
                    cover={media.cover}
                  />
                ) : (
                  <CarouselVideo
                    src={media.src}
                    poster={media.poster}
                    addPadding={media.addPadding}
                    cover={media.cover}
                    respect={media.respect}
                  />
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="w-full flex justify-end pr-2">
          <AppLink
            className="font-medium text-sm group text-neutral-50/85 hover:text-neutral-50"
            href={project.link}
            data-umami-event={`Project: ${project.title}`}
          >
            Learn more {project.link.includes("https://") ? "↗" : "→"}
          </AppLink>
        </div>
      </div>
    </div>
  );
}
