import Card from "@/components/card";
import {
  GithubLogo,
  HandWaving,
  LinkedinLogo,
  Mailbox,
} from "@phosphor-icons/react/dist/ssr";
import CardTitle from "@/components/card-title";
import ExperienceList from "@/components/experience";
import CardBody from "@/components/card-body";
import CardImage from "@/components/card-image";
import ProjectCard from "@/components/project-card";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 sm:gap-12">
      <main>
        <div className="space-y-4 sm:space-y-6">
          <div className="flex lg:flex-row gap-4 sm:gap-6 flex-col-reverse">
            {/* Experience & Education */}
            <div className="space-y-4 sm:space-y-6 w-full">
              <Card>
                <CardTitle>Experience</CardTitle>
                <ExperienceList
                  experiences={[
                    {
                      title: "CeSIUM",
                      position: [
                        "Co-Director - Open Source Department",
                        "Collaborator - Open Source Department",
                        "Collaborator - Marketing Department",
                      ],
                      period: "Oct'22 - present",
                      link: "https://cesium.pt",
                    },
                    {
                      title: "YariLabs",
                      position: ["Frontend Developer - Summer Internship"],
                      period: "Jun'24 - Aug'24",
                      link: "https://www.yarilabs.com/",
                    },
                    {
                      title: "CoderDojo",
                      position: [
                        "Python Mentor",
                        "Collaborator - Technology Department",
                      ],
                      period: "Oct'22 - Oct'24",
                      link: "https://coderdojobraga.org/",
                    },
                  ]}
                />
              </Card>
              <Card>
                <CardTitle>Education</CardTitle>
                <ExperienceList
                  experiences={[
                    {
                      title: "UMinho",
                      position: [
                        "M.S. in Software Engineering",
                        "B.S. in Software Engineering",
                      ],
                      period: "Oct'21 - present",
                      link: "https://www.uminho.pt/",
                    },
                  ]}
                />
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
        <ProjectCard
          image={{
            src: "/images/calendarium.png",
            alt: "Calendarium Logo",
          }}
          title="Calendarium"
          link="https://github.com/cesium/calendarium"
          description="Open-source *Next.js* web app with the goal of providing easy access to academic events, schedules, and activities to our students."
          footer="Next.js TypeScript Tailwind GoogleAPI"
        />
        <ProjectCard
          image={{
            src: "/images/unishare.png",
            alt: "UniShare Logo",
          }}
          title="UniShare"
          link="https://github.com/diogogmatos/EngWeb2024-Projeto"
          slug="UniShare"
          description="Web app with the main goal of being a hub for study support materials for the entire academic community, regardless of course or subject."
          footer="Next.js TypeScript Tailwind MongoDB Docker"
        />
        <ProjectCard
          image={{
            src: "/images/picturas.png",
            alt: "PictuRAS Logo",
          }}
          title="PictuRAS"
          link="https://github.com/diogogmatos/PictuRAS"
          slug="PictuRAS"
          description="Web app with the main goal of providing a powerful and easy to use image editing platform, with support for bulk editing, advanced AI-powered features and user accounts with different subscription levels."
          footer="Next.js TypeScript Tailwind TanStackQuery Socket.IO MongoDB RabbitMQ MinIO Docker"
        />
        <ProjectCard
          image={{
            src: "/images/dharma-market.png",
            alt: "Dharma Market Logo",
          }}
          title="Dharma Market"
          link="https://market.mydharma.network/"
          description="Collaborated with an awesome team to take the project to the next level, implementing a whole new merchandise system and a suite of improvements."
          footer="Vue.js TypeScript Tailwind Meilisearch"
        />
        <ProjectCard
          image={{
            src: "/images/sei-ou-nao-sei.png",
            alt: "SEI ou não SEI Logo",
          }}
          title="SEI ou não SEI"
          link="https://github.com/cesium/jeopardy"
          description="'Jeopardy-like' gameshow platform that was one of the most engaging new activities introduced in the 2024 edition of [SEI](https://2024.seium.org)."
          footer="Next.js TypeScript Tailwind Python"
        />
      </div>
    </div>
  );
}
