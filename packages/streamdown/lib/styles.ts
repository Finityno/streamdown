import { StyleSheet } from "react-native";

export type Theme = {
  colors?: {
    text?: string;
    background?: string;
    primary?: string;
    secondary?: string;
    muted?: string;
    mutedForeground?: string;
    border?: string;
    codeBackground?: string;
    codeText?: string;
    linkText?: string;
    blockquoteBorder?: string;
    blockquoteText?: string;
  };
  spacing?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  fontSizes?: {
    xs?: number;
    sm?: number;
    base?: number;
    lg?: number;
    xl?: number;
    "2xl"?: number;
    "3xl"?: number;
  };
  fonts?: {
    regular?: string;
    medium?: string;
    semibold?: string;
    bold?: string;
    mono?: string;
  };
};

const defaultTheme: Required<Theme> = {
  colors: {
    text: "#000000",
    background: "#FFFFFF",
    primary: "#007AFF",
    secondary: "#5856D6",
    muted: "#F2F2F7",
    mutedForeground: "#6E6E73",
    border: "#D1D1D6",
    codeBackground: "#F5F5F5",
    codeText: "#FF3B30",
    linkText: "#007AFF",
    blockquoteBorder: "#D1D1D6",
    blockquoteText: "#6E6E73",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  fontSizes: {
    xs: 10,
    sm: 12,
    base: 14,
    lg: 16,
    xl: 18,
    "2xl": 22,
    "3xl": 28,
  },
  fonts: {
    regular: "System",
    medium: "System",
    semibold: "System",
    bold: "System",
    mono: "Menlo",
  },
};

export const createStyles = (customTheme?: Theme) => {
  const theme: Required<Theme> = {
    colors: { ...defaultTheme.colors, ...customTheme?.colors },
    spacing: { ...defaultTheme.spacing, ...customTheme?.spacing },
    fontSizes: { ...defaultTheme.fontSizes, ...customTheme?.fontSizes },
    fonts: { ...defaultTheme.fonts, ...customTheme?.fonts },
  };

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    paragraph: {
      color: theme.colors.text,
      fontSize: theme.fontSizes.base!,
      lineHeight: theme.fontSizes.base! * 1.5,
      marginBottom: theme.spacing.md,
    },
    heading1: {
      color: theme.colors.text,
      fontSize: theme.fontSizes["3xl"]!,
      fontWeight: "600",
      marginTop: theme.spacing.xl,
      marginBottom: theme.spacing.md,
      lineHeight: theme.fontSizes["3xl"]! * 1.3,
    },
    heading2: {
      color: theme.colors.text,
      fontSize: theme.fontSizes["2xl"]!,
      fontWeight: "600",
      marginTop: theme.spacing.xl,
      marginBottom: theme.spacing.md,
      lineHeight: theme.fontSizes["2xl"]! * 1.3,
    },
    heading3: {
      color: theme.colors.text,
      fontSize: theme.fontSizes.xl!,
      fontWeight: "600",
      marginTop: theme.spacing.xl,
      marginBottom: theme.spacing.md,
      lineHeight: theme.fontSizes.xl! * 1.3,
    },
    heading4: {
      color: theme.colors.text,
      fontSize: theme.fontSizes.lg!,
      fontWeight: "600",
      marginTop: theme.spacing.xl,
      marginBottom: theme.spacing.md,
      lineHeight: theme.fontSizes.lg! * 1.3,
    },
    heading5: {
      color: theme.colors.text,
      fontSize: theme.fontSizes.base!,
      fontWeight: "600",
      marginTop: theme.spacing.xl,
      marginBottom: theme.spacing.md,
      lineHeight: theme.fontSizes.base! * 1.3,
    },
    heading6: {
      color: theme.colors.text,
      fontSize: theme.fontSizes.sm!,
      fontWeight: "600",
      marginTop: theme.spacing.xl,
      marginBottom: theme.spacing.md,
      lineHeight: theme.fontSizes.sm! * 1.3,
    },
    strong: {
      fontWeight: "600",
    },
    em: {
      fontStyle: "italic",
    },
    del: {
      textDecorationLine: "line-through",
    },
    link: {
      color: theme.colors.linkText,
      textDecorationLine: "underline",
    },
    inlineCode: {
      backgroundColor: theme.colors.codeBackground,
      color: theme.colors.codeText,
      fontFamily: theme.fonts.mono,
      fontSize: theme.fontSizes.sm,
      paddingHorizontal: theme.spacing.xs,
      paddingVertical: 2,
      borderRadius: 3,
    },
    codeBlock: {
      backgroundColor: theme.colors.codeBackground,
      borderRadius: 8,
      padding: theme.spacing.md,
      marginVertical: theme.spacing.md,
      fontFamily: theme.fonts.mono,
      fontSize: theme.fontSizes.sm,
      overflow: "scroll",
    },
    codeBlockText: {
      fontFamily: theme.fonts.mono,
      fontSize: theme.fontSizes.sm,
      color: theme.colors.text,
    },
    list: {
      marginVertical: theme.spacing.sm,
    },
    listItem: {
      flexDirection: "row",
      marginVertical: theme.spacing.xs,
      paddingLeft: theme.spacing.md,
    },
    listItemBullet: {
      marginRight: theme.spacing.sm,
      color: theme.colors.text,
    },
    orderedListItem: {
      flexDirection: "row",
      marginVertical: theme.spacing.xs,
      paddingLeft: theme.spacing.md,
    },
    blockquote: {
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.blockquoteBorder,
      paddingLeft: theme.spacing.md,
      marginVertical: theme.spacing.md,
    },
    blockquoteText: {
      color: theme.colors.blockquoteText,
      fontStyle: "italic",
    },
    table: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      marginVertical: theme.spacing.md,
      borderRadius: 8,
      overflow: "hidden",
    },
    tableHeader: {
      backgroundColor: theme.colors.muted,
      borderBottomWidth: 1,
      borderColor: theme.colors.border,
    },
    tableRow: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderColor: theme.colors.border,
    },
    tableCell: {
      flex: 1,
      padding: theme.spacing.sm,
      fontSize: theme.fontSizes.sm,
      color: theme.colors.text,
    },
    tableHeaderCell: {
      flex: 1,
      padding: theme.spacing.sm,
      fontSize: theme.fontSizes.sm,
      fontWeight: "600",
      color: theme.colors.text,
    },
    hr: {
      borderBottomWidth: 1,
      borderColor: theme.colors.border,
      marginVertical: theme.spacing.lg,
    },
  });
};
