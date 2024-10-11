import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['js', 'ts'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testMatch: ['<rootDir>/test/**/*.test.ts', '<rootDir>/test/*.test.ts'],
    verbose: true,
};

export default config;
