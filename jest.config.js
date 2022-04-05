module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
  '<rootDir>/src/**/*.ts', 
  '!<rootDir>/src/main/**', 
  '!<rootDir>/src/**/*-protocols.ts', 
  '!**/protocols/**', '!**/test/**'],
  coverageDirectory: "babel",
  coverageProvider: "v8",
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
};
