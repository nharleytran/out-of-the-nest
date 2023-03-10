import express from "express";
import UserDao from "../data/UserDao.js";
import ApiError from "../model/ApiError.js";

const router = express.Router();
export const userDao = new UserDao();

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
      console.log(13, req.body);
      console.log(14, email, password);
    if (!email || !password) {
      throw new ApiError(
        400,
        "You must provide an email and a password to login."
      );
    }

    const users = await userDao.readAll({ email });
      console.log(22, users);
    if (users.length === 0) {
      throw new ApiError(403, "Wrong email or password!");
    }
    // Since emails are unique, there will be only one matching user
    const user = users[0];

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
    });
    debug(`Done with ${req.method} ${req.path}`);
  } catch (err) {
    next(err);
  }
});

export default router;
