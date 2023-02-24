import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config()

const URI = "mongodb+srv://outofthenest:IBf1pTvKcdAvOtgm@outofthenest.3ji0djw.mongodb.net/?retryWrites=true&w=majority";
// process.env.DB_URI;

const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export function connect() {
  mongoose.connect(URI, option);

  mongoose.connection.on("error", (err) => {
    console.log("Could not connect to MongoDB");
    console.log(err);
  });
  
  mongoose.connection.on("open", () => {
    console.log("Connected to MongoDB!");
  });
}
