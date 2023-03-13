const dotenv = require("dotenv");
const express = require("express");
const posts = require("./routes/posts.js");
const users = require("./routes/user.js");
const { authRouter, checkPermission } = require("./routes/auth.js");
const db = require("./data/db.js");
const bodyParser = require("body-parser");
const cors = require("cors");
dotenv.config();

const app = express();
const api_url = process.env.REACT_APP_API_URL;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

console.log("api_url", api_url);
app.get(`${api_url}`, (req, res) => {
  res.send("Welcome to the Out of The Nest API!");
});

app.use(`${api_url}`, posts);
app.use(`${api_url}`, users);
app.use(`${api_url}`, authRouter);

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
