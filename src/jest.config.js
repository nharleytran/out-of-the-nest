module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: ['/node_modules/(?!(axios)/)'],
  moduleNameMapper: {
    '^axios$': require.resolve('axios'),
  },
};


module.exports = config;