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

function connectGridFs(URI) {
  const url = config.mongoURI;
  const connect = mongoose.createConnection(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  let gfs;
  connect.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(connect.db, {
      bucketName: "uploads"
    });
  });
  return gfs;
}

module.exports = { connect };
