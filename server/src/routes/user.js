import express from "express";
import UserDAO from "../data/UserDAO.js";

const router = express.Router();
export const userDao = new UserDAO();


router.post('/user/create', async (req, res) => {
  const {emai, name, password_hash } = req.body;
  try {
    const post = await postDao.createPost({ email, name, password_hash});
    res.json({
      status: 201,
     message: `Successfully created post with title: "${post.title}"`,
      data: post
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router;
