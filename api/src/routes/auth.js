const express = require("express");
const UserDAO = require("../data/UserDAO.js");
const ApiError = require("../model/ApiError.js");

const { createToken, decodeToken } = require("../util/token.js");
const { hashPassword, verifyPassword } = require("../util/password.js");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();
const userDao = new UserDAO();

authRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiError(
        400,
        "You must provide an email and a password to login."
      );
    }
    console.log("email", email, password);

    const user = await userDao.findUserByEmail(email);
    console.log("user", user);
    const token = createToken({
      user: {
        id: user._id,
        email: user.email,
      },
    });
    console.log("token", token);
    if (!verifyPassword(password, user.password)) {
      throw new ApiError(403, "Wrong email or password!");
    }
    res.json({
      status: 200,
      message: `Successfully signed in!`,
      data: {
        name: user.name,
        email: user.email,
        token: token,
      },
    });
  } catch (err) {
    console.log("err", err);
    next(err);
  }
});

const checkPermission = (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    const secret = process.env.REACT_APP_JWT_SECRET|| globalThis.__TEST_JWT_SECRET__;
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.log("err", err);
        next(new ApiError(401, "Unauthorized"));
      }
      next();
    });
  } catch (err) {
    console.log("err", err);
    next(new ApiError(401, "Unauthorized"));
  }
};

authRouter.post(
  "/testAuthorize",
  checkPermission,
  async (req, res, next) => {}
);

module.exports = {
  authRouter,
  checkPermission,
};
