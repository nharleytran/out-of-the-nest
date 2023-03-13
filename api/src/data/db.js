const dotenv = require("dotenv");
const mongoose = require("mongoose");

const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

function connect(URI) {
  mongoose.connect(URI, option);

  mongoose.connection.on("error", (err) => {
    console.log("Could not connect to MongoDB");
    console.log(err);
  });

  mongoose.connection.on("open", () => {
    console.log("Connected to MongoDB!");
  });
}

module.exports = { connect };
