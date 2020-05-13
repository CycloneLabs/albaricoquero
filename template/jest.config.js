const babelConfig = require("./babel.config.json");
const tsConfig = require("./tsconfig.json");

module.exports = {
  globals: {
    "vue-jest": {
      babelConfig,
      tsConfig
    },
  },

  moduleFileExtensions: ["js", "vue"],

  modulePaths: [
    "<rootDir>/src",
    "<rootDir>/src/index/",
    "<rootDir>/node_modules",
  ],

  transform: {
    "^.+\\.ts$": "<rootDir>/node_modules/ts-jest",
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
    ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest",
  },
};
