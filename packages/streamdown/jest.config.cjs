module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      {
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          '@babel/preset-typescript',
          ['@babel/preset-react', { runtime: 'automatic' }],
        ],
      },
    ],
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|react-native-marked|react-native-svg|react-native-syntax-highlighter|marked|github-slugger|@jsamr)/)',
  ],
  testMatch: ['**/__tests__/**/*.(test|spec).(ts|tsx|js)'],
  collectCoverageFrom: [
    'index.tsx',
    'lib/**/*.{ts,tsx}',
    '!lib/**/*.d.ts',
    '!**/__tests__/**',
  ],
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.ts'],
  moduleNameMapper: {
    '^react-native$': '<rootDir>/__tests__/react-native-mock.ts',
  },
};
