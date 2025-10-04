import { type ReactNode, useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Clipboard,
  StyleSheet,
} from "react-native";
import SyntaxHighlighter from "react-native-syntax-highlighter";
import { atomOneDark, atomOneLight } from "react-syntax-highlighter/styles/hljs";
import { ThemeContext } from "../index";

type CodeBlockProps = {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  colorScheme?: "light" | "dark";
};

export const CodeBlock = ({
  code,
  language = "text",
  showLineNumbers = false,
  colorScheme = "dark",
}: CodeBlockProps): ReactNode => {
  const [copied, setCopied] = useState(false);
  const theme = useContext(ThemeContext);

  const handleCopy = () => {
    Clipboard.setString(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const syntaxStyle = colorScheme === "dark" ? atomOneDark : atomOneLight;

  const headerBgColor =
    theme?.colors?.codeBackground || (colorScheme === "dark" ? "#1e1e1e" : "#f5f5f5");
  const headerTextColor =
    theme?.colors?.mutedForeground || (colorScheme === "dark" ? "#d4d4d4" : "#6e6e73");

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          {
            backgroundColor: headerBgColor,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          },
        ]}
      >
        <Text
          style={[
            styles.language,
            {
              color: headerTextColor,
              fontFamily: theme?.fonts?.mono || "monospace",
            },
          ]}
        >
          {language}
        </Text>
        <TouchableOpacity
          onPress={handleCopy}
          style={styles.copyButton}
          accessibilityLabel="Copy code"
          accessibilityHint="Copies the code to clipboard"
        >
          <Text
            style={[
              styles.copyButtonText,
              {
                color: copied ? "#10b981" : headerTextColor,
                fontFamily: theme?.fonts?.mono || "monospace",
              },
            ]}
          >
            {copied ? "✓ Copied" : "Copy"}
          </Text>
        </TouchableOpacity>
      </View>
      <SyntaxHighlighter
        language={language}
        style={syntaxStyle}
        highlighter="hljs"
        customStyle={{
          margin: 0,
          padding: 16,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          fontSize: theme?.fontSizes?.sm || 12,
          fontFamily: theme?.fonts?.mono || "monospace",
        }}
        {...(showLineNumbers && { lineNumberStyle: { color: "#6e7681" } })}
      >
        {code}
      </SyntaxHighlighter>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    borderRadius: 8,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  language: {
    fontSize: 12,
    textTransform: "lowercase",
  },
  copyButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  copyButtonText: {
    fontSize: 12,
  },
});
