import { ArrowUpRight, Info } from "@phosphor-icons/react/dist/ssr";
import type { MDXComponents } from "mdx/types";
import type { ImageProps } from "next/image";
import CopyButton from "./components/copy-button";
import Children from "react-children-utilities";
import Link from "next/link";
import { cloneElement, ReactElement, isValidElement } from "react";
import SkeletonImage from "./components/skeleton-image";
import clsx from "clsx";

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
      <h1 className="text-3xl sm:text-4xl font-bold mt-8 mb-4 sm:mt-10 border-b border-white/20 pb-2 scroll-mt-20">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="flex items-center text-2xl sm:text-3xl font-semibold mt-6 mb-3 sm:mt-8 sm:mb-4 border-white/20 scroll-mt-20 before:h-6 before:w-1 before:bg-white before:rounded-full before:inline-block before:mr-3">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl sm:text-2xl font-semibold my-5 sm:mt-6 sm:mb-3 scroll-mt-20">
        {children}
      </h3>
    ),
    p: (props) => (
      <p
        className="text-sm sm:text-base my-3 sm:my-5"
        key={props.children?.toString()}
      >
        {props.children}
      </p>
    ),
    a: ({ children, href }) => (
      <Link
        href={href ?? "/"}
        className="text-sm sm:text-base hover:underline cursor-pointer font-medium px-1 py-0.5 rounded-md transition-colors duration-200 bg-white/10 backdrop-blur-md"
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
    img: (props) => (
      <figure className="mdx-img-figure my-6 sm:my-8">
        <SkeletonImage props={{ ...(props as ImageProps) }} noFilter />
      </figure>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-6 my-4 text-sm sm:text-base">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-8 my-4">{children}</ol>
    ),
    li: ({ children }) => <li className="mb-1.5">{children}</li>,
    pre: ({ children }) => (
      <pre className="text-sm sm:text-base font-mono flex justify-between gap-2 rounded-md bg-white/10 backdrop-blur-md p-3 w-full overflow-hidden my-6">
        <code className="flex items-center text-[0.95em] leading-relaxed whitespace-pre overflow-x-scroll">
          {Children.onlyText(children)}
        </code>
        <div className="h-full min-w-fit">
          <CopyButton text={Children.onlyText(children)} />
        </div>
      </pre>
    ),
    code: ({ children }) => (
      <code className="bg-white/10 backdrop-blur-md px-1 py-[1px] rounded-[4px] text-sm sm:text-[0.95em] font-mono">
        {children}
      </code>
    ),
    blockquote: ({ children }) => {
      const isNote = Children.onlyText(children).includes("[!NOTE]");
      return (
        <blockquote
          className={clsx(
            isNote
              ? "bg-blue-500/20 px-4 rounded-md border-blue-500/30 border"
              : "border-l-4 border-white/80 bg-gradient-to-r from-white/10 to-transparent text-white/80 italic",
            "backdrop-blur-md my-6",
          )}
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
      <th className="border-b border-white/20 px-1 py-0.5 sm:px-2 sm:py-1 text-left font-medium">
        {children}
      </th>
    ),
    td: ({ children }) => <td className="p-1 sm:p-2 align-top">{children}</td>,
    ...components,
  };
}
