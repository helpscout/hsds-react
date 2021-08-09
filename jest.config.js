module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/index.{js,jsx}',
    '!src/**/?(*.)css.{js,jsx}',
    '!src/**/?(*.)helpers.{js,jsx}',
    '!src/**/?(*.)labs.{js,jsx}',
    '!src/**/?(*.)stories.{js,jsx}',
    '!src/**/stories/*.{js,jsx}',
    '!src/**/stories/**/*.{js,jsx}',
    '!src/**/?(*.)hsappstories.{js,jsx}',
    '!src/**/?(*.)storiesHelpers.{js,jsx}',
    '!src/utilities/specs/**/*.{js,jsx}',
    '!src/vendors/**/*.{js,jsx}',
  ],
  coverageDirectory: 'coverage/',
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  setupFiles: ['<rootDir>/config/jsdomPolyfills.js'],
  setupFilesAfterEnv: ['<rootDir>/config/jest/setupTests.js'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.test.(js|jsx)',
    '<rootDir>/src/**/?(*.)(spec|test).js?(x)',
  ],
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  moduleFileExtensions: ['web.js', 'js', 'json', 'web.jsx', 'jsx'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}
