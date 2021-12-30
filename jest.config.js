/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.jest.json'
    }
  },
  moduleNameMapper: {
    '@components/(.*)': '<rootDir>/src/components/$1',
    '@utils/(.*)': '<rootDir>/src/utils/$1',
    '@config/(.*)': '<rootDir>/src/config/$1',
    '@hooks/(.*)': '<rootDir>/src/hooks/$1',
    '@context/(.*)': '<rootDir>/src/context/$1'
  },
  setupFilesAfterEnv: ['./jest.setup.ts']
}
