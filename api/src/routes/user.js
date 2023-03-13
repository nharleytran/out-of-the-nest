const express = require("express");
const UserDAO = require("../data/UserDAO.js");
const { hashPassword } = require("../util/password.js");
const jwt = require("jsonwebtoken");

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

router.delete("/user/email/delete:email", async (req, res) => {
  const { email } = req.params.email;

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


module.exports = router;
