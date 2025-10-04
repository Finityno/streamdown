# Streamdown for React Native

A React Native markdown renderer designed for AI-powered streaming with incomplete markdown support.

[![npm version](https://img.shields.io/npm/v/streamdown)](https://www.npmjs.com/package/streamdown)
[![License](https://img.shields.io/npm/l/streamdown)](https://github.com/vercel/streamdown/blob/main/LICENSE)

## Overview

Formatting Markdown is easy, but when you tokenize and stream it from AI models, new challenges arise. **Streamdown** is built specifically to handle the unique requirements of streaming Markdown content in React Native applications, providing seamless formatting even with incomplete or unterminated Markdown blocks.

This is the React Native version of the Streamdown library, optimized for mobile applications with the same powerful streaming capabilities as the web version.

## Features

- 🚀 **React Native optimized** - Built specifically for React Native
- 🔄 **Streaming-optimized** - Handles incomplete Markdown gracefully
- 🎨 **Unterminated block parsing** - Styles incomplete bold, italic, code, links, and headings
- 📊 **GitHub Flavored Markdown** - Tables, task lists, and strikethrough support via react-native-marked
- 🎯 **Customizable theming** - Complete control over colors, fonts, and spacing
- 🛡️ **TypeScript** - Full type safety with exported types
- ⚡ **Performance optimized** - Memoized rendering for efficient updates

## Installation

\`\`\`bash
npm install streamdown react-native-marked react-native-svg
# or
yarn add streamdown react-native-marked react-native-svg
# or
pnpm add streamdown react-native-marked react-native-svg
\`\`\`

For iOS, also run:
\`\`\`bash
cd ios && pod install
\`\`\`

## Usage

### Basic Example

\`\`\`tsx
import React from 'react';
import { ScrollView } from 'react-native';
import { Streamdown } from 'streamdown';

export default function App() {
  const markdown = "# Hello World\\n\\nThis is **streaming** markdown!";

  return (
    <ScrollView>
      <Streamdown>{markdown}</Streamdown>
    </ScrollView>
  );
}
\`\`\`

### With Custom Theme

\`\`\`tsx
import React from 'react';
import { ScrollView } from 'react-native';
import { Streamdown } from 'streamdown';

const theme = {
  colors: {
    text: '#FFFFFF',
    background: '#000000',
    primary: '#3B82F6',
    codeBackground: '#1E1E1E',
    linkText: '#60A5FA',
  },
  fontSizes: {
    base: 16,
    lg: 20,
    '2xl': 24,
    '3xl': 32,
  },
  spacing: {
    md: 16,
    lg: 24,
  },
};

export default function App() {
  const markdown = "# Dark Theme Example\\n\\nWith custom colors and sizing!";

  return (
    <ScrollView style={{ backgroundColor: '#000000' }}>
      <Streamdown theme={theme}>{markdown}</Streamdown>
    </ScrollView>
  );
}
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`children\` | \`string\` | - | The Markdown content to render |
| \`parseIncompleteMarkdown\` | \`boolean\` | \`true\` | Parse and style unterminated Markdown blocks |
| \`theme\` | \`Theme\` | - | Custom theme object for colors, fonts, and spacing |
| \`renderer\` | \`RendererInterface\` | - | Custom renderer for markdown elements |
| \`containerStyle\` | \`ViewStyle\` | - | React Native style for the container View |

## Supported Markdown Features

- ✅ Headings (H1-H6)
- ✅ Paragraphs
- ✅ **Bold** and *italic* text
- ✅ ~~Strikethrough~~
- ✅ \`Inline code\`
- ✅ Code blocks
- ✅ Links
- ✅ Lists (ordered and unordered)
- ✅ Blockquotes
- ✅ Tables
- ✅ Horizontal rules
- ✅ Incomplete markdown auto-completion

## Requirements

- React Native >= 0.70.0
- React >= 18.0.0
- react-native-svg >= 13.0.0

## License

Apache-2.0
