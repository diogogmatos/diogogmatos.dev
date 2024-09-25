import Card from "@/components/card";
import {
  GithubLogo,
  LinkedinLogo,
  Mailbox,
} from "@phosphor-icons/react/dist/ssr";
import styles from "./styles.module.css";

export default function Home() {
  return (
    <main className="p-8 sm:p-12 relative h-screen flex flex-col gap-8 sm:gap-12 md:px-24 lg:px-32 xl:px-40">
      <div className="absolute top-0 left-0 size-full bg-gradient-to-br from-blue-700/70 via-40% via-blue-700/30 to-80% to-blue-700/10 -z-10" />
      <div className={styles.pattern} />
      <div className="space-y-4">
        <h1 className="font-bold text-4xl sm:text-5xl">Diogo Matos</h1>
        <p className="sm:text-lg">
          software engineering @{" "}
          <a className="font-bold hover:underline" href="https://www.uminho.pt">
            uminho
          </a>
        </p>
      </div>
      <div className="grid gap-6">
        <Card>
          <h1 className="font-bold text-lg sm:text-xl">Experience</h1>
        </Card>
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
  );
}
