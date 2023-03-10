import express from "express";
import UserDAO from "../data/UserDAO.js";
import ApiError from "../model/ApiError.js";
import { createToken, decodeToken } from "../util/token.js";

const router = express.Router();
const userDao = new UserDAO();

router.post("/login", async (req, res, next) => {
  try {
    const { email, password} = req.body;
    if (!email || !password) {
      throw new ApiError(
        400,
        "You must provide an email and a password to login."
      );
    }

    const user = await userDao.findUserByEmail(email);
    const token = createToken({ user: { id: user.id } });
      console.log('user', password, user.password);
    if (password != user.password) {
      throw new ApiError(403, "Wrong email or password!");
    }

    res.status(200).json({
      status: 200,
      message: `Successfully signed in!`,
      data: {
        name: user.name,
        email: user.email,
      },
      token,
    });
    debug(`Done with ${req.method} ${req.path}`);
  } catch (err) {
    next(err);
  }
});

export default router;
