// import type { Config } from '@jest/types';
import type { JestConfigWithTsJest } from 'ts-jest';

/** @type {import("ts-jest/dist/types").InitialOptionsTsJest} */
const customJestConfig: JestConfigWithTsJest = {
  collectCoverageFrom: ['**/*.{js,ts}', '!**/*.d.ts', '!**/node_modules/**'],
  modulePaths: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
  rootDir: './',
  roots: ['<rootDir>/src'],
  setupFiles: ['dotenv/config'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['node_modules/', 'coverage/', '.next/'],
  preset: 'ts-jest', // or other ESM presets
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
};

export default customJestConfig;
