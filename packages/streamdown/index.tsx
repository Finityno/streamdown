import { Fragment, createContext, memo, useMemo } from "react";
import { View, useColorScheme } from "react-native";
import { useMarkdown, type useMarkdownHookOptions } from "react-native-marked";
import type { RendererInterface } from "react-native-marked";
import { parseMarkdownIntoBlocks } from "./lib/parse-blocks";
import { parseIncompleteMarkdown } from "./lib/parse-incomplete-markdown";
import { CustomStreamdownRenderer } from "./lib/components";
import { createStyles, type Theme } from "./lib/styles";

export type StreamdownProps = {
  children?: string;
  parseIncompleteMarkdown?: boolean;
  theme?: Theme;
  renderer?: RendererInterface;
  containerStyle?: object;
};

type BlockProps = {
  content: string;
  shouldParseIncompleteMarkdown: boolean;
  theme?: Theme;
  renderer?: RendererInterface;
};

export const ThemeContext = createContext<Theme | undefined>(undefined);

/**
 * Optimized Block component with memoization
 * Only re-renders when content changes (like original streamdown)
 */
const Block = memo(
  ({
    content,
    shouldParseIncompleteMarkdown,
    theme,
    renderer: customRenderer,
  }: BlockProps) => {
    const colorScheme = useColorScheme();

    // Memoize parsed content to avoid re-parsing on every render
    const parsedContent = useMemo(
      () =>
        typeof content === "string" && shouldParseIncompleteMarkdown
          ? parseIncompleteMarkdown(content.trim())
          : content,
      [content, shouldParseIncompleteMarkdown]
    );

    // Memoize renderer instance to prevent recreation
    const renderer = useMemo(
      () => customRenderer || new CustomStreamdownRenderer(theme, colorScheme ?? "light"),
      [customRenderer, theme, colorScheme]
    );

    // Memoize markdown options
    const options: useMarkdownHookOptions = useMemo(
      () => ({
        colorScheme: colorScheme ?? "light",
        renderer,
      }),
      [colorScheme, renderer]
    );

    // Use the hook to get rendered elements
    const elements = useMarkdown(parsedContent, options);

    return (
      <>
        {elements.map((element: any, index: number) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: required for streaming
          <Fragment key={`element_${index}`}>{element}</Fragment>
        ))}
      </>
    );
  },
  // Custom comparator - only re-render if content changes
  (prevProps, nextProps) => prevProps.content === nextProps.content
);

Block.displayName = "Block";

/**
 * Main Streamdown component with full performance optimizations
 * - Memoized to prevent unnecessary re-renders
 * - Block parsing for efficient streaming
 * - Context-based theme propagation
 * - Incomplete markdown parsing for AI streaming
 */
export const Streamdown = memo(
  ({
    children,
    parseIncompleteMarkdown: shouldParseIncompleteMarkdown = true,
    theme,
    renderer,
    containerStyle,
  }: StreamdownProps) => {
    // Memoize styles to prevent recreation on every render
    const styles = useMemo(() => createStyles(theme), [theme]);

    // Memoize block parsing - critical for streaming performance
    const blocks = useMemo(
      () =>
        parseMarkdownIntoBlocks(typeof children === "string" ? children : ""),
      [children]
    );

    return (
      <ThemeContext.Provider value={theme}>
        <View style={[styles.container, containerStyle]}>
          {blocks.map((block, index) => (
            <Block
              content={block}
              // biome-ignore lint/suspicious/noArrayIndexKey: required for streaming
              key={`block_${index}`}
              renderer={renderer}
              shouldParseIncompleteMarkdown={shouldParseIncompleteMarkdown}
              theme={theme}
            />
          ))}
        </View>
      </ThemeContext.Provider>
    );
  },
  // Only re-render when children changes - critical for streaming performance
  (prevProps, nextProps) => prevProps.children === nextProps.children
);

Streamdown.displayName = "Streamdown";

// Named exports
export { parseIncompleteMarkdown, parseMarkdownIntoBlocks };

// Type exports
export type { Theme } from "./lib/styles";

// Default export
export default Streamdown;
