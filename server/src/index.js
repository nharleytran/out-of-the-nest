import * as dotenv from 'dotenv' 

import express from "express";
import posts from "./routes/posts.js";
import users from "./routes/user.js";
import auth from "./routes/auth.js";
import * as db from "./data/db.js";
import bodyParser from "body-parser";
import cors from 'cors';
dotenv.config()

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


app.get("/", (req, res) => {
  res.send("Welcome to the Out of The Nest API!");
});

app.use(posts);
app.use(users);
app.use(auth);

app.use((err, req, res, next) => {
  if (err) {
    const code = err.status || 500;
    res.status(code).json({
      status: code,
      message: err.message || `Internal Server Error!`,
    });
  }
  next();
});

export default app;



