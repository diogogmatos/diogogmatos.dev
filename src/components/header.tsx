"use client";

import Link from "next/link";
import {
  GithubLogo,
  LinkedinLogo,
  Mailbox,
} from "@phosphor-icons/react/dist/ssr";
import Markdown from "./markdown";
import FadeIn from "./animations/fade-in";

const contacts = [
  {
    name: "GitHub",
    icon: <GithubLogo size={18} weight="duotone" />,
    href: "https://github.com/diogogmatos",
  },
  {
    name: "LinkedIn",
    icon: <LinkedinLogo size={18} weight="duotone" />,
    href: "https://linkedin.com/in/diogo-matos",
  },
  {
    name: "Email",
    icon: <Mailbox size={18} weight="duotone" />,
    href: "mailto:career@diogogmatos.dev",
  },
  //   {
  //     name: "G. Scholar",
  //     icon: <GraduationCap size={18} weight="duotone" />,
  //     href: "https://scholar.google.com/citations?user=MDNLu9YAAAAJ&hl",
  //   },
];

export default function Header() {
  return (
    <section className="flex flex-col gap-4 pl-2 mb-12">
      <FadeIn as="h1">
        <Link href="/" className="font-primary text-3xl sm:text-4xl">
          Diogo Matos
        </Link>
      </FadeIn>
      <FadeIn
        as="span"
        delay={0.1}
        className="max-w-md text-balance text-sm text-neutral-50/90"
      >
        <Markdown>
          {
            "Software engineering student at [**UMinho**](https://www.uminho.pt), currently conducting Master's thesis research at [**UNIFI**](https://unifi.it) on the energy efficiency and consumption of Large Language Models (LLMs)."
          }
        </Markdown>
      </FadeIn>
      <FadeIn
        as="ul"
        delay={0.2}
        className="flex flex-wrap gap-4 w-full text-sm font-medium"
      >
        {contacts.map((contact, idx) => (
          <li key={idx}>
            <a
              href={contact.href}
              data-umami-event={contact.name}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex space-x-1 items-center justify-center text-neutral-50/90 hover:text-neutral-50 active:scale-95 cursor-pointer transition-all"
            >
              {contact.icon}
              <span className="relative inline-flex after:absolute after:bottom-0 after:border-b after:transition-all after:w-0 group-hover:after:w-full after:border-white">
                {contact.name}
              </span>
            </a>
          </li>
        ))}
      </FadeIn>
    </section>
  );
}
