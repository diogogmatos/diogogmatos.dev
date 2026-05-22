import { ArrowUpRight, Info } from "@phosphor-icons/react/dist/ssr";
import type { MDXComponents } from "mdx/types";
import type { ImageProps } from "next/image";
import CopyButton from "./components/copy-button";
import Children from "react-children-utilities";
import { cloneElement, ReactElement, isValidElement } from "react";
import clsx from "clsx";
import AppLink from "./components/app-link";
import Image from "next/image";

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

export const customComponents: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-2xl font-bold mt-8 mb-4 border-b border-white/20 pb-2 scroll-mt-20">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="flex items-center text-xl font-semibold mt-12 mb-4 border-white/20 scroll-mt-20 before:h-6 before:w-1 before:bg-white before:inline-block before:mr-3">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold mt-6 mb-4 scroll-mt-20">{children}</h3>
  ),
  p: (props) => (
    <p className="text-sm mt-4 mb-6" key={props.children?.toString()}>
      {props.children}
    </p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  a: ({ children, href }) => (
    <span className="px-1 py-0.5 rounded-md transition-colors duration-200 bg-white/10 backdrop-blur-md">
      <AppLink
        href={href ?? "/"}
        className="font-medium"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
        <ArrowUpRight
          size="1em"
          weight="bold"
          className="inline-flex translate-x-0.5"
        />
      </AppLink>
    </span>
  ),
  hr: () => <hr className="border-white/30 my-6" />,
  img: (props) => (
    <Image
      {...(props as ImageProps)}
      width={parseInt(String(props.width)) || 600}
      height={parseInt(String(props.height)) || 600}
      className={clsx("mdx-img-figure my-6 rounded-lg", props.className)}
      alt={props.alt ?? ""}
    />
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-6 my-4 text-sm">{children}</ul>
  ),
  ol: ({ children }) => <ol className="list-decimal pl-8 my-4">{children}</ol>,
  li: ({ children }) => <li className="mb-1.5">{children}</li>,
  pre: ({ children }) => (
    <pre className="text-sm font-mono flex justify-between gap-2 rounded-md bg-white/10 backdrop-blur-md p-3 w-full overflow-hidden my-6">
      <code className="flex items-center text-[0.95em] leading-relaxed whitespace-pre overflow-x-scroll no-scrollbar">
        {Children.onlyText(children)}
      </code>
      <div className="h-full min-w-fit">
        <CopyButton text={Children.onlyText(children)} />
      </div>
    </pre>
  ),
  code: ({ children }) => (
    <code className="bg-white/10 backdrop-blur-md px-1 py-[1px] rounded-[4px] text-sm font-mono">
      {children}
    </code>
  ),
  blockquote: ({ children }) => {
    const isNote = Children.onlyText(children).includes("[!NOTE]");
    return (
      <blockquote
        className={clsx(
          isNote
            ? "bg-blue-500/20 px-4 py-0.5 rounded-md"
            : "border-l-4 border-white/80 bg-gradient-to-r from-white/10 to-transparent text-neutral-50/80 italic",
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
                  <span
                    key={Math.random()}
                    className="flex items-center font-medium mb-2 text-base"
                  >
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
  tr: ({ children }) => <tr>{children}</tr>,
  th: ({ children }) => (
    <th className="border-b border-white/20 px-2 py-1 text-left font-medium">
      {children}
    </th>
  ),
  td: ({ children }) => <td className="p-2 align-top">{children}</td>,
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...customComponents,
    ...components,
  };
}
