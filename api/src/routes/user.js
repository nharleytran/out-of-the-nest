const express = require("express");
const UserDAO = require("../data/UserDAO.js");
const { hashPassword } = require("../util/password.js");
const jwt = require("jsonwebtoken");
const { checkPermission } = require("./auth.js");

const router = express.Router();
const userDao = new UserDAO();

router.post("/user/create", async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const user = await userDao.createUser({
      email,
      name,
      password: hashPassword(password),
    });
    res.json({
      status: 200,
      message: `Successfully created user "${user.email}"`,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/user/email/delete/:email", async (req, res) => {
  const { email } = req.params;

  try {
    await userDao.deleteUserByEmail(email);
    res.json({
      status: 200,
      message: `Successfully deleted user "${email}"`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/user/profile/:userId", checkPermission, async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await userDao.findUserById(userId);
    res.json({
      status: 200,
      message: `Successfully get user "${user.email}"`,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.put("/user/update/:userId", checkPermission,  async (req, res) => {
  const postId = req.params.userId;
  const updatedFields = req.body;

  try {
    const updatedPost = await userDao.updateUserProfile(postId, updatedFields);
    res.json({
      status: 200,
      message: "user profile updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    console.err(error);
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
