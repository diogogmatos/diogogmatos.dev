import { MDXContent } from "@content-collections/mdx/react";
import { customComponents } from "@/mdx-components";
import AppLink from "./app-link";
import React from "react";

interface MDXProps {
  code: string;
  components?: React.ComponentProps<typeof MDXContent>["components"];
}

export default function MDX({ code, components }: MDXProps) {
  const ignoredTags = ["h1", "h2", "h3", "p", "a"];
  const filteredComponents = Object.fromEntries(
    Object.entries(customComponents).filter(
      ([key]) => !ignoredTags.includes(key),
    ),
  );

  return (
    <MDXContent
      code={code}
      components={{
        a: ({ children, href }) => (
          <AppLink href={href ?? "#"} target="_blank" rel="noopener noreferrer">
            {children}
          </AppLink>
        ),
        ...filteredComponents,
        ...components,
      }}
    />
  );
}
