module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    setupTestFrameworkScriptFile: 'jest-extended',
    setupFiles: ['jest-plugin-unhandled-promise/setup', '<rootDir>/src/setupTests'],
    coverageReporters: ['json-summary', 'lcov', 'text'],
    testEnvironment: 'node',
  };
  