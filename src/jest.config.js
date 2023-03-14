module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"]
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
  // Change MODULE_NAME_HERE to your module that isn't being compiled
    "node_modules/(?!(axios)/)"
};
