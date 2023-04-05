const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const posts = require("./routes/posts.js");
const users = require("./routes/user.js");
const images = require("./routes/images.js");
const { authRouter, checkPermission } = require("./routes/auth.js");
const db = require("./data/db.js");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const api_url = process.env.REACT_APP_API_URL;
console.log('13',process.env.REACT_APP_DB_URI)

if (!api_url) {
  throw new Error("REACT_APP_API_URL must be defined in .env file!");
}


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get(`${api_url}`, (req, res) => {
  res.send("Welcome to the Out of The Nest API!");
});

app.use(`${api_url}`, posts);
app.use(`${api_url}`, users);
app.use(`${api_url}`, authRouter);
app.use(`${api_url}`, images);

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

module.exports = app;
