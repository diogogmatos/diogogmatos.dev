import { ArrowUpRight, Info } from "@phosphor-icons/react/dist/ssr";
import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import CopyButton from "./components/copy-button";
import Children from "react-children-utilities";
import Link from "next/link";
import { cloneElement, ReactElement, isValidElement } from "react";

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
      <h1 className="text-2xl font-bold my-4 border-b border-white/20 pb-2">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl font-semibold mb-4 mt-12 border-b border-white/20 pb-2">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-medium mb-4 mt-6">{children}</h3>
    ),
    p: ({ children }) => <p className="text-sm my-4">{children}</p>,
    a: ({ children, href }) => (
      <Link
        href={href ?? "/"}
        className="text-sm hover:underline cursor-pointer font-medium items-center py-0.5 px-1 rounded-lg bg-white/10 leading-loose"
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
    hr: () => <hr className="border-white/30 my-4" />,
    img: (props) => (
      <Image
        height={1000}
        width={1000}
        className="rounded-lg overflow-hidden"
        {...(props as ImageProps)}
        alt={props.alt ?? "Image"}
      />
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-6 text-sm my-4">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-8 text-sm">{children}</ol>
    ),
    li: ({ children }) => <li className="my-1">{children}</li>,
    pre: ({ children }) => (
      <pre className="flex justify-between gap-2 rounded-md bg-white/10 p-2 text-sm w-full">
        <code className="flex overflow-x-scroll items-center">
          {Children.onlyText(children)}
        </code>
        <div className="h-full min-w-fit">
          <CopyButton text={Children.onlyText(children)} />
        </div>
      </pre>
    ),
    code: ({ children }) => (
      <code className="bg-white/10 px-0.5 rounded-sm">{children}</code>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className={`${Children.onlyText(children).includes("[!NOTE]") ? "bg-blue-500/20 p-1 px-3 rounded-md border-blue-500/30 border my-4" : "border-l-4 border-white/20 pl-2"}`}
      >
        {Children.onlyText(children).includes("[!NOTE]") ? (
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
    ),
    table: ({ children }) => (
      <div className="rounded-lg border border-white/10 bg-white/5 my-4 py-2">
        <table className="">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border-b border-white/20 pb-2 text-sm">{children}</th>
    ),
    td: ({ children }) => <td className="px-2 pt-2">{children}</td>,
    ...components,
  };
}
