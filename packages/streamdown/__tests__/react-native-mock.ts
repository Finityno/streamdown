import React from 'react';

// Simple React Native mock that renders components as divs/spans
const mockComponent = (name: string) => {
  const Component: any = (props: any) => {
    return React.createElement(name.toLowerCase(), props, props.children);
  };
  Component.displayName = name;
  return Component;
};

export const View = mockComponent('View');
export const Text = mockComponent('Text');
export const Image = mockComponent('Image');
export const TouchableOpacity = mockComponent('TouchableOpacity');
export const ActivityIndicator = mockComponent('ActivityIndicator');

export const StyleSheet = {
  create: (styles: any) => styles,
};

export const Linking = {
  canOpenURL: jest.fn(() => Promise.resolve(true)),
  openURL: jest.fn(() => Promise.resolve()),
};

export const useColorScheme = jest.fn(() => 'light');

export const Platform = {
  OS: 'ios' as const,
  select: (obj: any) => obj.ios || obj.default,
};

export const Clipboard = {
  setString: jest.fn(),
};
