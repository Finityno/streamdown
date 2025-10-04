// Jest setup for React Native tests
import '@testing-library/react-native/extend-expect';

// Silence console warnings during tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};
