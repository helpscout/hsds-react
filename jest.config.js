const { jsWithBabel: tsjPreset } = require('ts-jest/presets')

module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/?(*.)types.{js,jsx,ts,tsx}',
    '!src/**/?(*.)helpers.{js,jsx,ts,tsx}',
    '!src/**/?(*.)stories.{js,jsx,ts,tsx}',
    '!src/**/?(*.)testHelpers.{js,jsx,ts,tsx}',
    '!src/tests/helpers/**/*.{js,jsx,ts,tsx}',
    '!src/styles/tests/helpers/**/*.{js,jsx,ts,tsx}',
    '!src/**/?(*.)css.{js,jsx,ts,tsx}',
    '!src/index.{js,jsx,ts,tsx}',
    '!src/components/Input/utils.{js,jsx}',
    '!src/components/Dropdown/V2/Dropdown.Renderer.tsx',
    '!src/components/Dropdown/V2/Dropdown.renderUtils.ts',
    '!src/components/Popper/**/*.{js,jsx}',
    '!src/components/Route/**/*.{js,jsx,ts}',
    '!src/tests/helpers/**/*.{js,jsx}',
    '!src/utilities/browser.{js,jsx,ts}',
    '!src/utilities/env.{js,jsx,ts}',
    '!src/utilities/react-router/**/*.{js,jsx}',
    '!src/utilities/smoothScroll.{js,jsx}',
    '!src/utilities/closest.ts',
    '!src/utilities/memoizeOne.{js,ts}',
    '!src/utilities/index.{js,jsx}',
    '!src/utilities/log.{js,jsx}',
    '!src/styles/includePaths.js',
    '!src/polyfills/**/*.{js,jsx}',
    '!src/vendors/**/*.{js,jsx}',
    '!src/components/index.js',
    '!src/components/Animate/animations/**/*',
    '!src/components/HSDS/**/*',
    '!src/components/ScopeProvider/**/*',
  ],
  coverageDirectory: 'coverage/',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  setupFiles: [
    '<rootDir>/config/polyfills.js',
    '<rootDir>/config/jsdomPolyfills.js',
  ],
  setupFilesAfterEnv: ['<rootDir>/config/jest/setupTests.js'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.test.(js|jsx|ts|tsx)',
    '<rootDir>/src/**/?(*.)(spec|test).js?(x)',
    '<rootDir>/src/**/?(*.)(spec|test).ts?(x)',
  ],
  testEnvironment: 'node',
  testURL: 'http://localhost',
  transform: {
    ...tsjPreset.transform,
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)':
      '<rootDir>/config/jest/fileTransform.js',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$'],
  moduleFileExtensions: ['web.js', 'js', 'json', 'web.jsx', 'jsx', 'ts', 'tsx'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
}
