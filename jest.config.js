module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
  '<rootDir>/src/**/*.ts', 
  '!<rootDir>/src/main/**', 
  '!<rootDir>/src/domain/**',
  '!<rootDir>/src/**/*-protocols.ts', 
  '!**/protocols/**', '!**/test/**'],
  coverageDirectory: "babel",
  preset: '@shelf/jest-mongodb',
  coverageProvider: "v8",
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
};
