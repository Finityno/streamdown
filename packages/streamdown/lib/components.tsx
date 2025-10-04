import { type ReactNode } from "react";
import {
  Text,
  View,
  Linking,
  type TextStyle,
  useColorScheme,
} from "react-native";
import { Renderer } from "react-native-marked";
import type { RendererInterface } from "react-native-marked";
import { createStyles, type Theme } from "./styles";
import { CodeBlock } from "./code-block";
import { StreamdownImage } from "./image";
import { TableCopyButton } from "./table";

/**
 * Optimized Custom Renderer with memoization and performance patterns
 * from the original streamdown implementation
 */
export class CustomStreamdownRenderer
  extends Renderer
  implements RendererInterface
{
  private theme?: Theme;
  private styles: ReturnType<typeof createStyles>;
  private colorScheme: "light" | "dark";

  // Memoized style maps for headings
  private headingStyleMap: Record<number, TextStyle>;

  constructor(theme?: Theme, colorScheme?: "light" | "dark") {
    super();
    this.theme = theme;
    this.colorScheme = colorScheme || "dark";
    this.styles = createStyles(theme);

    // Pre-compute heading styles for performance
    this.headingStyleMap = {
      1: this.styles.heading1,
      2: this.styles.heading2,
      3: this.styles.heading3,
      4: this.styles.heading4,
      5: this.styles.heading5,
      6: this.styles.heading6,
    };
  }

  // Optimized heading rendering
  heading(text: string | ReactNode, level: number): ReactNode {
    return (
      <Text key={this.getKey()} style={this.headingStyleMap[level]}>
        {text}
      </Text>
    );
  }

  // Paragraphs
  paragraph(text: string | ReactNode): ReactNode {
    return (
      <Text key={this.getKey()} style={this.styles.paragraph}>
        {text}
      </Text>
    );
  }

  // Bold text
  strong(text: string | ReactNode): ReactNode {
    return (
      <Text key={this.getKey()} style={this.styles.strong}>
        {text}
      </Text>
    );
  }

  // Italic text
  em(text: string | ReactNode): ReactNode {
    return (
      <Text key={this.getKey()} style={this.styles.em}>
        {text}
      </Text>
    );
  }

  // Strikethrough text
  del(text: string | ReactNode): ReactNode {
    return (
      <Text key={this.getKey()} style={this.styles.del}>
        {text}
      </Text>
    );
  }

  // Links with optimized handler
  link(href: string, text: string | ReactNode): ReactNode {
    const handlePress = async () => {
      if (href && href !== "streamdown:incomplete-link") {
        const supported = await Linking.canOpenURL(href);
        if (supported) {
          await Linking.openURL(href);
        }
      }
    };

    // Don't make incomplete links pressable
    if (href === "streamdown:incomplete-link") {
      return (
        <Text key={this.getKey()} style={this.styles.link}>
          {text}
        </Text>
      );
    }

    return (
      <Text key={this.getKey()} style={this.styles.link} onPress={handlePress}>
        {text}
      </Text>
    );
  }

  // Inline code
  codespan(text: string, _styles?: TextStyle): ReactNode {
    return (
      <Text key={this.getKey()} style={this.styles.inlineCode}>
        {text}
      </Text>
    );
  }

  // Code blocks with syntax highlighting
  code(code: string, language?: string): ReactNode {
    return (
      <View key={this.getKey()}>
        <CodeBlock
          code={code}
          language={language || "text"}
          colorScheme={this.colorScheme}
        />
      </View>
    );
  }

  // Blockquotes
  blockquote(text: string | ReactNode): ReactNode {
    return (
      <View key={this.getKey()} style={this.styles.blockquote}>
        <Text style={this.styles.blockquoteText}>{text}</Text>
      </View>
    );
  }

  // Lists
  list(body: string | ReactNode, ordered: boolean): ReactNode {
    return (
      <View key={this.getKey()} style={this.styles.list}>
        {body}
      </View>
    );
  }

  listItem(text: string | ReactNode, ordered: boolean, index: number): ReactNode {
    const bullet = ordered ? `${index + 1}.` : "•";

    return (
      <View
        key={this.getKey()}
        style={ordered ? this.styles.orderedListItem : this.styles.listItem}
      >
        <Text style={this.styles.listItemBullet}>{bullet}</Text>
        <View style={{ flex: 1 }}>
          <Text>{text}</Text>
        </View>
      </View>
    );
  }

  // Horizontal rule
  hr(): ReactNode {
    return <View key={this.getKey()} style={this.styles.hr} />;
  }

  // Table with copy functionality
  table(header: ReactNode, body: ReactNode): ReactNode {
    // TODO: Extract table content for copy functionality
    return (
      <View key={this.getKey()}>
        <View style={{ flexDirection: "row", justifyContent: "flex-end", marginBottom: 8 }}>
          <TableCopyButton tableContent="" theme={this.theme} />
        </View>
        <View style={this.styles.table}>
          {header}
          {body}
        </View>
      </View>
    );
  }

  tableRow(content: ReactNode, isHeader: boolean): ReactNode {
    return (
      <View
        key={this.getKey()}
        style={[
          this.styles.tableRow,
          isHeader ? this.styles.tableHeader : undefined,
        ]}
      >
        {content}
      </View>
    );
  }

  tableCell(content: string | ReactNode, isHeader: boolean): ReactNode {
    return (
      <Text
        key={this.getKey()}
        style={isHeader ? this.styles.tableHeaderCell : this.styles.tableCell}
      >
        {content}
      </Text>
    );
  }

  // Optimized images with loading states
  image(uri: string, alt?: string): ReactNode {
    return (
      <StreamdownImage
        key={this.getKey()}
        uri={uri}
        alt={alt}
        theme={this.theme}
      />
    );
  }
}
