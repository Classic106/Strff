module.exports = {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^~/(.*)$": "<rootDir>/$1",
    "^vue$": "vue/dist/vue.common.js",
  },
  moduleFileExtensions: [
    //'ts', // if using TypeScript
    "js",
    "vue",
    "json",
  ],
  transform: {
    //"^.+\\.ts$": "ts-jest", // if using TypeScript
    "^.+\\.js$": "babel-jest",
    ".*\\.(vue)$": "vue-jest",
  },
  setupFiles: ["./jest/jest-setup.js"],
  transformIgnorePatterns: ["/node_modules/(?!vue-upload-drop-images/)"],
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/components/**/*.vue",
    "<rootDir>/pages/**/*.vue",
  ],
};
