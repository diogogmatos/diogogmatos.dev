import Card from "@/components/card";
import {
  ArrowUpRight,
  GithubLogo,
  HandWaving,
  LinkedinLogo,
  Mailbox,
  PaintBrush,
} from "@phosphor-icons/react/dist/ssr";
import styles from "./styles.module.css";
import CardTitle from "@/components/card-title";
import ExperienceList from "@/components/experience";
import CardBody from "@/components/card-body";
import CardImage from "@/components/card-image";

export default function Home() {
  return (
    <div className="p-6 sm:p-12 relative min-h-screen flex flex-col gap-6 sm:gap-12 md:px-24 lg:px-32 xl:px-40">
      <div className={styles.gradient} />
      <div className={styles.pattern} />
      <header className="space-y-4">
        <h1 className="font-bold text-4xl sm:text-5xl">Diogo Matos</h1>
        <p className="sm:text-lg">
          software engineering @{" "}
          <a
            className="font-bold hover:underline"
            href="https://www.uminho.pt"
            target="_blank"
            rel="noopener noreferrer"
          >
            uminho
          </a>
        </p>
      </header>
      <main>
        <div className="space-y-6">
          <div className="flex lg:flex-row gap-6 flex-col-reverse">
            <div className="space-y-6 w-full">
              <Card>
                <CardTitle>Experience</CardTitle>
                <ExperienceList
                  experiences={[
                    {
                      title: "YariLabs",
                      position: ["Frontend Developer - Summer Internship"],
                      period: "Jun'24 - Aug'24",
                      link: "https://www.yarilabs.com/",
                    },
                    {
                      title: "CeSIUM",
                      position: [
                        "Co-Director of Open Source Department",
                        "Collaborator at Open Source and Marketing Departments",
                      ],
                      period: "Oct'22 - present",
                      link: "https://cesium.pt",
                    },
                    {
                      title: "CoderDojo Braga",
                      position: [
                        "Python Mentor",
                        "Collaborator at Technology and Development Department",
                      ],
                      period: "Oct'22 - present",
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
            <div className="space-y-6 flex flex-col">
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
      <h1 className="font-bold text-2xl sm:text-3xl">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card innerClassName="py-2 px-2">
          <div className="h-40">
            <CardImage src="/images/calendarium.png" alt="Calendarium Logo" />
          </div>
          <div className="p-4">
            <CardTitle>
              <a
                href="https://github.com/cesium/calendarium"
                target="_blank"
                rel="noopener noreferrer"
                className="sm:text-lg font-bold hover:underline"
              >
                Calendarium
                <ArrowUpRight
                  size={16}
                  className="inline-flex -translate-y-0.5 translate-x-0.5"
                />
              </a>
            </CardTitle>
            <CardBody>
              <p>
                Open-source <i>Next.js</i> web app with the goal of providing
                easy access to academic events, schedules, and activities to our
                students.
              </p>
            </CardBody>
            <p className="text-white/50 text-center w-full pt-2 text-sm">
              Next.js TypeScript Tailwind GoogleAPI
            </p>
          </div>
        </Card>
        <Card innerClassName="py-2 px-2">
          <div className="h-40">
            <CardImage src="/images/unishare.png" alt="UniShare Logo" />
          </div>
          <div className="p-4">
            <CardTitle>
              <a
                href="https://github.com/diogogmatos/EngWeb2024-Projeto"
                target="_blank"
                rel="noopener noreferrer"
                className="sm:text-lg font-bold hover:underline"
              >
                UniShare
                <ArrowUpRight
                  size={16}
                  className="inline-flex -translate-y-0.5 translate-x-0.5"
                />
              </a>
            </CardTitle>
            <CardBody>
              <p>
                Web app with the main goal of being a hub for study support
                materials for the entire academic community, regardless of
                course or subject.
              </p>
            </CardBody>
            <p className="text-white/50 text-center w-full pt-2 text-sm">
              Next.js TypeScript Tailwind MongoDB
            </p>
          </div>
        </Card>
        <Card innerClassName="py-2 px-2">
          <div className="h-40">
            <CardImage src="/images/dharma-market.png" alt="UniShare Logo" />
          </div>
          <div className="p-4">
            <CardTitle>
              <a
                href="https://market.mydharma.network/"
                target="_blank"
                rel="noopener noreferrer"
                className="sm:text-lg font-bold hover:underline"
              >
                Dharma Market
                <ArrowUpRight
                  size={16}
                  className="inline-flex -translate-y-0.5 translate-x-0.5"
                />
              </a>
            </CardTitle>
            <CardBody>
              <p>
                Collaborated with an awesome team to take the project to the
                next level, implementing a whole new merchandise system and a
                suite of improvements.
              </p>
            </CardBody>
            <p className="text-white/50 text-center w-full pt-2 text-sm">
              Vue.js TypeScript Tailwind Meilisearch
            </p>
          </div>
        </Card>
        <Card innerClassName="py-2 px-2">
          <div className="h-40">
            <CardImage
              src="/images/sei-ou-nao-sei.png"
              alt="Calendarium Logo"
            />
          </div>
          <div className="p-4">
            <CardTitle>
              <a
                href="https://github.com/cesium/jeopardy"
                target="_blank"
                rel="noopener noreferrer"
                className="sm:text-lg font-bold hover:underline"
              >
                SEI ou não SEI
                <ArrowUpRight
                  size={16}
                  className="inline-flex -translate-y-0.5 translate-x-0.5"
                />
              </a>
            </CardTitle>
            <CardBody>
              <p>
                &apos;Jeopardy-like&apos; gameshow platform that was one of the
                most engaging new activities introduced in the 2024 edition of{" "}
                <a
                  href="https://seium.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  SEI
                </a>
                .
              </p>
            </CardBody>
            <p className="text-white/50 text-center w-full pt-2 text-sm">
              Next.js TypeScript Tailwind Python
            </p>
          </div>
        </Card>
      </div>
      <footer className="w-full flex justify-center text-white/50 col-span-2 space-x-2 items-center text-center">
        <p>
          proudly developed and designed by me{" "}
          <PaintBrush size={18} className="inline-flex mb-1" />
        </p>
      </footer>
    </div>
  );
}
