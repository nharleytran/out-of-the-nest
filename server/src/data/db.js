import * as dotenv from 'dotenv' 
import mongoose from "mongoose";

dotenv.config()

// const URI = "mongodb+srv://outofthenest:IBf1pTvKcdAvOtgm@outofthenest.3ji0djw.mongodb.net/dev?retryWrites=true&w=majority";
const URI = process.env.DB_URI;

console.log('line8', URI);
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
