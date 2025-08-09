import { ArrowUpRight, Info } from "@phosphor-icons/react/dist/ssr";
import type { MDXComponents } from "mdx/types";
import type { ImageProps } from "next/image";
import CopyButton from "./components/copy-button";
import Children from "react-children-utilities";
import Link from "next/link";
import { cloneElement, ReactElement, isValidElement } from "react";
import SkeletonImage from "./components/skeleton-image";

const replaceTextInElement = (
  element: ReactElement,
  search: string,
  replace: string,
): ReactElement => {
  const processNode = (node: React.ReactNode): React.ReactNode => {
    if (typeof node === "string") {
      return node.replaceAll(search, replace);
    }

    if (isValidElement(node)) {
      return cloneElement(node, {
        ...node.props,
        children: Children.map(node.props.children, (child) =>
          processNode(child),
        ),
      });
    }

    if (Array.isArray(node)) {
      return node.map(processNode);
    }

    return node;
  };

  return processNode(element) as ReactElement;
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-2xl sm:text-3xl font-bold mt-10 mb-4 border-b border-white/20 pb-2 scroll-mt-20">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-2 border-b border-white/20 pb-2 scroll-mt-20">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-1 scroll-mt-20">
        {children}
      </h3>
    ),
    p: (props) => (
      <p className="my-4" key={props.children?.toString()}>
        {props.children}
      </p>
    ),
    a: ({ children, href }) => (
      <Link
        href={href ?? "/"}
        className="hover:underline cursor-pointer font-medium px-1 py-0.5 rounded-md transition-colors duration-200 bg-white/10 backdrop-blur-md"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}{" "}
        <ArrowUpRight
          size="1.2em"
          className="inline-flex -translate-y-[0.05rem]"
        />
      </Link>
    ),
    hr: () => <hr className="border-white/30 my-6" />,
    img: (props) => <SkeletonImage {...(props as ImageProps)} noFilter />,
    ul: ({ children }) => <ul className="list-disc pl-6 my-4">{children}</ul>,
    ol: ({ children }) => (
      <ol className="list-decimal pl-8 my-4">{children}</ol>
    ),
    li: ({ children }) => <li className="mb-1.5">{children}</li>,
    pre: ({ children }) => (
      <pre className="flex justify-between gap-2 rounded-md bg-white/10 backdrop-blur-md p-3 w-full overflow-x-auto">
        <code className="flex items-center text-[0.95em] leading-relaxed whitespace-pre">
          {Children.onlyText(children)}
        </code>
        <div className="h-full min-w-fit">
          <CopyButton text={Children.onlyText(children)} />
        </div>
      </pre>
    ),
    code: ({ children }) => (
      <code className="bg-white/10 backdrop-blur-md px-1 py-[1px] rounded-[4px] text-[0.95em]">
        {children}
      </code>
    ),
    blockquote: ({ children }) => {
      const isNote = Children.onlyText(children).includes("[!NOTE]");
      return (
        <blockquote
          className={
            (isNote
              ? "bg-blue-500/20 px-4 rounded-md border-blue-500/30 border my-4"
              : "border-l-4 border-white/20 pl-4 my-4 text-white/80 italic") +
            " backdrop-blur-md"
          }
        >
          {isNote ? (
            <>
              {Children.deepMap(
                Children.deepMap(children, (child) =>
                  replaceTextInElement(child as ReactElement, "[!NOTE]", ""),
                ),
                (child) =>
                  (child as ReactElement).type === "br" ? (
                    <span className="flex items-center font-medium mb-2 text-base">
                      <Info className="inline-flex mr-1" /> Note
                    </span>
                  ) : (
                    child
                  ),
              )}
            </>
          ) : (
            children
          )}
        </blockquote>
      );
    },
    table: ({ children }) => (
      <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-md my-4 overflow-x-auto">
        <table className="w-full text-left text-sm leading-relaxed">
          {children}
        </table>
      </div>
    ),
    tr: ({ children }) => (
      <tr className="divide-x divide-white/20">{children}</tr>
    ),
    th: ({ children }) => (
      <th className="border-b border-white/20 px-3 py-2 text-left font-medium">
        {children}
      </th>
    ),
    td: ({ children }) => <td className="px-3 py-2 align-top">{children}</td>,
    ...components,
  };
}
