const { defaults } = require("jest-config");

module.exports = {
  verbose: true,
  clearMocks: true,
  collectCoverage: true,
  setupFiles: ["<rootDir>/test/setup.js"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/test/__mocks__/file.js",
    "\\.(css|less|scss|sass)$": "<rootDir>/test/__mocks__/styles.js"
  },
  unmockedModulePathPatterns: ["node_modules/react/", "node_modules/enzyme/"],
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"]
};
