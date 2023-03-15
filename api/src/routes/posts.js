const express = require("express");
const PostDAO = require("../data/PostDAO.js");
const CategoryDAO = require("../data/CategoryDAO.js");
const { checkPermission } = require("./auth.js");

const router = express.Router();
const postDao = new PostDAO();
const categoryDao = new CategoryDAO();

router.get("/categories", checkPermission, async (req, res) => {
  try {
    const categories = await categoryDao.getCategory();
    res.json({
      status: 200,
      message: `Successfully retrieved 5 categories!`,
      data: categories,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/posts/category/:categoryId", checkPermission, async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    const post = await postDao.getPostsByCategory(categoryId);
    res.json({
      status: 200,
      message: `Successfully retrieved post with ID ${categoryId}`,
      data: post,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/posts", checkPermission, async (req, res) => {
  const {
    title,
    objective,
    outcome,
    content,
    author,
    category_id,
    gpa,
    testscore,
    resume,
    extracurriculars,
    international,
  } = req.body;
  try {
    const post = await postDao.createPost({
      title,
      objective,
      outcome,
      content,
      author,
      category_id,
      gpa,
      testscore,
      resume,
      extracurriculars,
      international,
    });
    res.json({
      status: 201,
      message: `Successfully created post with title: "${post.title}"`,
      data: post,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/posts/:postId", checkPermission, async (req, res) => {
  const postId = req.params.postId;

  try {
    const deletedPost = await postDao.deletePost(postId);

    res.json({
      status: 200,
      message: `Successfully deleted post with title: "${deletedPost.title}"`,
      data: deletedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/posts/:postId", checkPermission, async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await postDao.getPost(postId);
    res.json({
      status: 200,
      message: `Successfully retrieved post with ID ${postId}`,
      data: post,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/posts/:postId", checkPermission, async (req, res) => {
  const postId = req.params.postId;
  const updatedFields = req.body;

  try {
    const updatedPost = await postDao.updatePost(postId, updatedFields);
    res.json({
      status: 200,
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get(
  "/filters/category",
  checkPermission,
  async (req, res) => {
    const { categoryId, sortBy, outcome } = req.query;
    try {
      const filteredPosts = await postDao.getPostsByFilters(
        categoryId,
        sortBy || null,
        outcome || null
      );

      res.json({
        status: 200,
        message: "Successfully retrieved filtered posts",
        data: filteredPosts,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Add more routes to retrieve other fields as needed

module.exports = router;
