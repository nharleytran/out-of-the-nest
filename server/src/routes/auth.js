import express from "express";
import UserDAO from "../data/UserDAO.js";
import ApiError from "../model/ApiError.js";
import { createToken, decodeToken } from "../util/token.js";
import { hashPassword, verifyPassword } from "../util/password.js";

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

    const user = await userDao.findUserByEmail(email);
    const token = createToken({ user: { id: user._id, email: user.email } });
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
      console.log(req.headers);
    const bearerHeader = req.headers["authorization"];
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    console.log('token', token);
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log('err', err);
            next(new ApiError(401, "Unauthorized"));
        }
        console.log('success authorize');
        console.log('decoded', decoded);
        next();
    });

    next(new ApiError(403, "Forbidden"));
  } catch (err) {
      console.log('err', err);
    next(new ApiError(401, "Unauthorized"));
  }
};

authRouter.post("/testAuthorize", checkPermission, async (req, res, next) => {
});

export {authRouter, checkPermission};
