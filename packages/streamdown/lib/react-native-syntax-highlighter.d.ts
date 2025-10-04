declare module 'react-native-syntax-highlighter' {
  import { Component } from 'react';
  import { TextStyle } from 'react-native';

  export interface SyntaxHighlighterProps {
    language?: string;
    style?: any;
    children?: string;
    highlighter?: 'hljs' | 'prism';
    customStyle?: TextStyle;
    CodeTag?: any;
    PreTag?: any;
  }

  export default class SyntaxHighlighter extends Component<SyntaxHighlighterProps> {}
}

declare module 'react-syntax-highlighter/styles/hljs' {
  export const atomOneDark: any;
  export const atomOneLight: any;
  export const docco: any;
  export const github: any;
  export const googlecode: any;
  export const monokai: any;
  export const tomorrow: any;
  export const vs: any;
}
