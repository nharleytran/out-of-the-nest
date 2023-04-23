const config = {
  // globals: {
  //   __TEST_DB_URI__:
  //     "mongodb+srv://outofthenest:IBf1pTvKcdAvOtgm@outofthenest.3ji0djw.mongodb.net/dev?retryWrites=true&w=majority",
  //   __API_URL__: "/api",
  //   __TEST_JWT_SECRET__: "d41d8cd9dfderef0dfd0b204e9800998ecf8427e",
  //
  // },
  transformIgnorePatterns: ['/node_modules/(?!(axios)/)'],
  moduleNameMapper: {
    '^axios$': require.resolve('axios'),
  },
  setupFiles: ["<rootDir>/__test__/setup.js"],
};
module.exports = config;
