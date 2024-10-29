import Card from "./card";
import CardImage from "./card-image";
import CardTitle from "./card-title";
import CardBody from "./card-body";
import CardFooter from "./card-footer";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Markdown from "markdown-to-jsx";

interface ProjectCardProps {
  image?: {
    src: string;
    alt: string;
  };
  title: string;
  link?: string;
  description: string;
  footer?: string;
}

const ProjectCard = ({
  image,
  title,
  link,
  description,
  footer,
}: ProjectCardProps) => {
  return (
    <Card innerClassName="py-2 px-2" clickable>
      {image && (
        <div className="h-40">
          <CardImage src={image.src} alt={image.alt} />
        </div>
      )}
      <div className="p-4">
        <CardTitle>
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:text-lg font-bold hover:underline"
            >
              {title}
              <ArrowUpRight
                size={16}
                className="inline-flex -translate-y-0.5 translate-x-0.5"
              />
            </a>
          ) : (
            <h3 className="sm:text-lg font-bold">{title}</h3>
          )}
        </CardTitle>
        <CardBody className="line-clamp-4" id="markdown">
          <Markdown>{description}</Markdown>
        </CardBody>
        <CardFooter>{footer}</CardFooter>
      </div>
    </Card>
  );
};

export default ProjectCard;
