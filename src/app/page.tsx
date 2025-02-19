import Card from "@/components/card";
import {
  GithubLogo,
  HandWaving,
  LinkedinLogo,
  Mailbox,
} from "@phosphor-icons/react/dist/ssr";
import CardTitle from "@/components/card-title";
import ExperienceList from "@/components/experience-list";
import CardBody from "@/components/card-body";
import CardImage from "@/components/card-image";
import client from "../../tina/__generated__/client";
import ProjectList from "@/components/project-list";

export default async function Home() {
  const projectProps = await client.queries.projectConnection({
    sort: "relevance",
  });
  const experienceProps = await client.queries.experienceConnection({
    sort: "relevance",
  });

  return (
    <div className="flex flex-col gap-6 sm:gap-12">
      <main>
        <div className="space-y-4 sm:space-y-6">
          <div className="flex lg:flex-row gap-4 sm:gap-6 flex-col-reverse">
            {/* Experience & Education */}
            <div className="space-y-4 sm:space-y-6 w-full">
              <Card>
                <CardTitle>Experience</CardTitle>
                <ExperienceList props={experienceProps} />
              </Card>
              <Card>
                <CardTitle>Education</CardTitle>
                <ExperienceList props={experienceProps} isEducation />
              </Card>
            </div>
            {/* About */}
            <div className="space-y-4 sm:space-y-6 flex flex-col">
              <Card
                className="lg:size-full lg:min-h-0 min-h-48"
                innerClassName="py-2 px-2"
              >
                <CardImage src="/images/highlight.jpg" alt="Diogo Matos" />
              </Card>
              <Card className="lg:min-w-96 lg:max-w-96">
                <CardTitle>
                  <p className="font-bold text-lg sm:text-xl">
                    Hi there! I&apos;m Diogo{" "}
                    <HandWaving
                      size={24}
                      weight="duotone"
                      className="inline-flex -translate-y-0.5"
                    />
                  </p>
                </CardTitle>
                <CardBody>
                  <p>
                    Welcome to my tiny little corner of the internet. I use this
                    space to share my thoughts, projects, and experiences.
                  </p>
                  <p>Feel free to reach out and explore my work ^^.</p>
                </CardBody>
              </Card>
            </div>
          </div>
          {/* Contacts / Socials */}
          <Card>
            <div className="grid xl:grid-cols-3 grid-flow-row xl:grid-flow-col gap-3 w-full sm:text-lg">
              <span className="flex space-x-2 items-center justify-center xl:justify-start">
                <Mailbox size={18} weight="duotone" />
                <a
                  href="mailto:career@diogogmatos.dev"
                  className="hover:underline"
                >
                  career@diogogmatos.dev
                </a>
              </span>
              <span className="flex space-x-2 items-center justify-center">
                <GithubLogo size={18} weight="duotone" />
                <a
                  href="https://github.com/diogogmatos"
                  className="hover:underline"
                >
                  diogogmatos
                </a>
              </span>
              <span className="flex space-x-2 items-center justify-center xl:justify-end">
                <LinkedinLogo size={18} weight="duotone" />
                <a
                  href="https://linkedin.com/in/diogo-matos"
                  className="hover:underline"
                >
                  diogo-matos
                </a>
              </span>
            </div>
          </Card>
        </div>
      </main>
      <h1 className="font-bold text-2xl sm:text-3xl pl-2">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        <ProjectList props={projectProps} />
      </div>
    </div>
  );
}
