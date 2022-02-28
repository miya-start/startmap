module.exports = {
  clearMocks: true,
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/app/$1',
  },
  setupFiles: ['dotenv/config'],
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
}
