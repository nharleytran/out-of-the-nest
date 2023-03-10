import express from "express";
import UserDAO from "../data/UserDAO.js";

const router = express.Router();
export const userDao = new UserDAO();

router.post('/user/create', async (req, res) => {
  const {email, name, password_hash } = req.body;
    console.log('router post data', email, name, password_hash);
    console.log('router post data', req.body);
  try {
    const user = await userDao.createUser({ email, name, password_hash});
      console.log('router post user', user);
    res.json({
      status: 201,
     message: `Successfully created user "${user.email}"`,
      data: user
    });
  } catch (error) {
      //console.log('router post error', error);
    res.status(500).json({ message: error.message });
  }
});


export default router;
