module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: ['/node_modules/(?!(axios)/)'],
  moduleNameMapper: {
    '^axios$': require.resolve('axios'),
  },
  setupFiles: ["<rootDir>/__test__/setup.js"],
};


module.exports = config;