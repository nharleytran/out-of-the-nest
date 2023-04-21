module.exports = {
  presets: ['@babel/preset-env'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
  // Change MODULE_NAME_HERE to your module that isn't being compiled
  "/node_modules/(?!axios).+\\.js$"
  ]
}
