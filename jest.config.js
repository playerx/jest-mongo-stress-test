const { resolve } = require('path')

module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testURL: 'http://localhost',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  //   preset: '@shelf/jest-mongodb',
  globalSetup: resolve(__dirname, './jest/setup.js'),
  globalTeardown: resolve(__dirname, './jest/teardown.js'),
  testEnvironment: resolve(__dirname, './jest/environment.js'),
}
