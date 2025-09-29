interface TextNode {
  type: "text";
  text: string;
  [key: string]: unknown;
}

interface ParentNode {
  type: string;
  children: Node[];
  [key: string]: unknown;
}

export type Node = TextNode | ParentNode;

/**
 * Recursively extracts all text content from a nested AST-like JSON structure.
 *
 * @param node The current node to process (starting with the root object).
 * @returns A string containing the concatenated text from all descendant 'text' nodes.
 */
export default function extractTextFromAST(node: Node): string {
  if (node.type === "text") {
    return (node as TextNode).text || "";
  }

  if ("children" in node && Array.isArray(node.children)) {
    return (node.children as Node[]).map(extractTextFromAST).join("");
  }

  return "";
}
