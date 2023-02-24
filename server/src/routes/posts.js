import express from "express";
import PostDAO from "../data/PostDAO.js";
import CategoryDAO from "../data/CategoryDAO.js";

const router = express.Router();
export const postDao = new PostDAO();
export const categoryDao = new CategoryDAO();


router.get("/categories", async (req, res) => {
    try{
      const categories = await categoryDao.getCategory();
      res.json({
        status: 200,
        message: `Successfully retrieved 5 categories!`,
        data: categories,
      });
    } catch (error) {
      res.status(404).json({message: error.message});
    }
  });


export default router;