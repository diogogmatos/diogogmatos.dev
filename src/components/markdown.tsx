import ReactMarkdown from "react-markdown";
import { customComponents } from "@/mdx-components";
import AppLink from "./app-link";
import remarkGfm from "remark-gfm";

type MarkdownProps = React.ComponentProps<typeof ReactMarkdown>;

export default function Markdown({ components, ...props }: MarkdownProps) {
  const ignoredTags = ["h1", "h2", "h3", "p", "a"];
  const filteredComponents = Object.fromEntries(
    Object.entries(customComponents).filter(
      ([key]) => !ignoredTags.includes(key),
    ),
  );
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ children, href }) => (
          <AppLink href={href ?? "#"} target="_blank" rel="noopener noreferrer">
            {children}
          </AppLink>
        ),
        ...filteredComponents,
        ...components,
      }}
      {...props}
    />
  );
}
