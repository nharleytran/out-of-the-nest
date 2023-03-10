import express from "express";
import UserDAO from "../data/UserDAO.js";

const router = express.Router();
export const userDao = new UserDAO();

const checkPermission = (req, res, next) => {
  try {
    if (req.method === "POST") {
      return next();
    }

    const bearerHeader = req.headers["authorization"];
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    const { id, role } = decodeToken(token);
    if (role === UserRole.Instructor) {
      return next();
    }

    if (req.method === "GET" && id === req.params.id) {
      return next();
    } else if (req.method === "PUT" && id === req.params.id) {
      return next();
    } else if (req.method === "DELETE" && id === req.params.id) {
      return next();
    }

    next(new ApiError(403, "Forbidden"));
  } catch (err) {
    next(new ApiError(401, "Unauthorized"));
  }
};

router.post("/user/create", async (req, res) => {
  const { email, name, password_hash } = req.body;
  try {
    const user = await userDao.createUser({ email, name, password_hash });
    res.json({
      status: 201,
      message: `Successfully created user "${user.email}"`,
      data: user,
    });
  } catch (error) {
    //console.log('router post error', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
