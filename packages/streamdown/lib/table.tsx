import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Clipboard,
  StyleSheet,
} from "react-native";

type TableCopyButtonProps = {
  tableContent: string;
  theme?: any;
};

export const TableCopyButton = ({ tableContent, theme }: TableCopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    Clipboard.setString(tableContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <TouchableOpacity
      onPress={handleCopy}
      style={styles.copyButton}
      accessibilityLabel="Copy table"
      accessibilityHint="Copies the table content to clipboard"
    >
      <Text
        style={[
          styles.copyButtonText,
          {
            color: copied ? "#10b981" : (theme?.colors?.mutedForeground || "#6e6e73"),
          },
        ]}
      >
        {copied ? "✓ Copied" : "Copy"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  copyButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  copyButtonText: {
    fontSize: 12,
  },
});
