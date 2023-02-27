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

router.post('/posts', async (req, res) => {
  const { title, outcome, content, author, category_id, gpa, testscore, resume, extracurriculars } = req.body;
  try {
    const post = await postDao.createPost({ title, outcome, content, author, category_id, gpa, testscore, resume, extracurriculars });
    res.json({
      status: 201,
     message: `Successfully created post with title: "${post.title}"`,
      data: post
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/posts/:postId', async (req, res) => {
  const postId = req.params.postId;

  try {
    const deletedPost = await postDao.deletePost(postId);

    res.json({
      status: 200,
      message: `Successfully deleted post with title: "${deletedPost.title}"`,
      data: deletedPost
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/posts/:postId', async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await postDao.getPost(postId);
    res.json({
      status: 200,
      message: `Successfully retrieved post with ID ${postId}`,
      data: post
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/posts/:postId', async (req, res) => {
  const postId = req.params.postId;
  const updatedFields = req.body;

  try {
    const updatedPost = await postDao.updatePost(postId, updatedFields);
    res.json({
      status: 200,
      message: 'Post updated successfully',
      data: updatedPost
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


// Add more routes to retrieve other fields as needed


  

export default router;