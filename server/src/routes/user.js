import express from "express";
import UserDAO from "../data/UserDAO.js";
import { hashPassword } from "../util/password.js";
import jwt from "jsonwebtoken";

const router = express.Router();
export const userDao = new UserDAO();


router.post("/user/create", async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const user = await userDao.createUser({ email, name, password: hashPassword(password) });
    res.json({
      status: 200,
      message: `Successfully created user "${user.email}"`,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

export default router;
