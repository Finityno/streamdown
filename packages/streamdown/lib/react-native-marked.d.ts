declare module "react-native-marked" {
  import type { ReactNode } from "react";

  export interface useMarkdownHookOptions {
    colorScheme?: "light" | "dark";
    renderer?: RendererInterface;
  }

  export interface RendererInterface {
    heading?: (text: string | ReactNode, level: number) => ReactNode;
    paragraph?: (text: string | ReactNode) => ReactNode;
    strong?: (text: string | ReactNode) => ReactNode;
    em?: (text: string | ReactNode) => ReactNode;
    del?: (text: string | ReactNode) => ReactNode;
    link?: (href: string, text: string | ReactNode) => ReactNode;
    codespan?: (text: string) => ReactNode;
    code?: (code: string, language?: string) => ReactNode;
    blockquote?: (text: string | ReactNode) => ReactNode;
    list?: (body: string | ReactNode, ordered: boolean) => ReactNode;
    listItem?: (text: string | ReactNode, ordered: boolean, index: number) => ReactNode;
    hr?: () => ReactNode;
    table?: (header: ReactNode, body: ReactNode) => ReactNode;
    tableRow?: (content: ReactNode, isHeader: boolean) => ReactNode;
    tableCell?: (content: string | ReactNode, isHeader: boolean) => ReactNode;
    image?: (uri: string, alt?: string) => ReactNode;
  }

  export class Renderer implements RendererInterface {
    heading(text: string | ReactNode, level: number): ReactNode;
    paragraph(text: string | ReactNode): ReactNode;
    strong(text: string | ReactNode): ReactNode;
    em(text: string | ReactNode): ReactNode;
    del(text: string | ReactNode): ReactNode;
    link(href: string, text: string | ReactNode): ReactNode;
    codespan(text: string): ReactNode;
    code(code: string, language?: string): ReactNode;
    blockquote(text: string | ReactNode): ReactNode;
    list(body: string | ReactNode, ordered: boolean): ReactNode;
    listItem(text: string | ReactNode, ordered: boolean, index: number): ReactNode;
    hr(): ReactNode;
    table(header: ReactNode, body: ReactNode): ReactNode;
    tableRow(content: ReactNode, isHeader: boolean): ReactNode;
    tableCell(content: string | ReactNode, isHeader: boolean): ReactNode;
    image(uri: string, alt?: string): ReactNode;
    getKey(): string;
  }

  export function useMarkdown(
    markdown: string,
    options?: useMarkdownHookOptions
  ): ReactNode[];
}
