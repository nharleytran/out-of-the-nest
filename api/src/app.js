const dotenv = require('dotenv');
const express = require('express');
const posts = require("./routes/posts.js");
const users = require("./routes/user.js");
const {authRouter, checkPermission} = require("./routes/auth.js");
const db = require("./data/db.js");
const bodyParser = require("body-parser");
const cors = require('cors');
dotenv.config()

const app = express();
const endpoint = process.env.END_POINT;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());


app.get(`${endpoint}`, (req, res) => {
  res.send("Welcome to the Out of The Nest API!");
});

app.use(`${endpoint}`, posts);
app.use(`${endpoint}`, users);
app.use(`${endpoint}`, authRouter);

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



