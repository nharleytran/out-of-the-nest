const express = require("express");
const PostDAO = require("../data/PostDAO.js");
const CategoryDAO = require("../data/CategoryDAO.js");
const UserDAO = require("../data/UserDAO.js");
const { checkPermission, decodeTokenFromRequest } = require("./auth.js");

const router = express.Router();
const postDao = new PostDAO();
const userDao = new UserDAO();
const categoryDao = new CategoryDAO();

router.get("/categories", async (req, res) => {
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

router.get("/posts/avgGPA", async (req, res) => {
  try {
    const avgGPA = await postDao.getAverageGPA();
    res.json({
      status: 200,
      message: `Successfully retrieved average GPA!`,
      data: avgGPA,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


router.get("/posts/category/:categoryId", async (req, res) => {
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
    anonymous
  } = req.body;
  const user_id = req.user_id;
  try {
    const post = await postDao.createPost({
      title,
      objective,
      outcome,
      content,
      user_id,
      category_id,
      gpa,
      testscore,
      resume,
      extracurriculars,
      international,
      anonymous
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

router.get("/posts/:postId", async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await postDao.getPost(postId);
    const user = await userDao.findUserById(post.user_id);

    const decoded = decodeTokenFromRequest(req);

    const postUpdate = {
      ...post._doc,
      editable: decoded ? decoded.id == post.user_id : false,
      user_name: user?user.name:"",
    };

    res.json({
      status: 200,
      message: `Successfully retrieved post with ID ${postId}`,
      data: postUpdate,
    });
  } catch (error) {
    console.log(error);
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
//LIKE a post
router.put("/likeposts/:postId", checkPermission, async (req, res) => {
  const postId = req.params.postId;
  const user_id = req.user_id;

  try {
    const updatedPost = await postDao.likePost(postId, user_id);
    res.json({
      status: 200,
      message: "Post liked successfully",
      data: updatedPost,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
//Dislike a post:
router.put("/dislikeposts/:postId", checkPermission, async (req, res) => {
  const postId = req.params.postId;
  const user_id = req.user_id;

  try {
    const updatedPost = await postDao.dislikePost(postId, user_id);
    res.json({
      status: 200,
      message: "Post disliked successfully",
      data: updatedPost,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


router.get(
  "/filters/category",
  // checkPermission,
  async (req, res) => {
    const { categoryId, sortBy, outcome, international } = req.query;
    try {
      const filteredPosts = await postDao.getPostsByFilters(
        categoryId,
        sortBy || null,
        outcome || null,
        international || null
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





// Get all comments of a post
router.get("/posts/:postId/comments", async (req, res) => {
  const postId = req.params.postId;
  try {
    const comments = await postDao.getComments(postId);
    const decoded = decodeTokenFromRequest(req);
    const updatedComments = comments.map(comment => {
      return {
        ...comment?._doc,
        editable : decoded ? decoded.id == comment.user_id : false,
        user_name: decoded?decoded.name:"",
      };
    });
    res.json({
      status: 200,
      message: `Successfully get all comments for post with id: ${postId}`,
      data: updatedComments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
})

// Create a new comment for a post
router.post("/posts/:postId/comments", checkPermission, async (req, res) => {

  const postId = req.params.postId;
  const text = req.body.text;
  const user_id = req.user_id;
  try {
    const post = await postDao.createComment(postId, text, user_id);
    res.json({
      status: 200,
      message: `Successfully created a new comment for post with title: "${post.title}"`,
      data: post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Update a comment in a post
router.put("/posts/:postId/comments/:commentId", checkPermission, async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const updatedComment = req.body.updatedComment;

  try {
    const post = await postDao.updateComment(postId, commentId, updatedComment);

    res.json({
      status: 200,
      message: `Successfully updated comment with ID ${commentId} for post with title: "${post.title}"`,
      data: post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Delete a comment from a post
router.delete("/posts/:postId/comments/:commentId", checkPermission, async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;

  try {
    const post = await postDao.deleteComment(postId, commentId);

    res.json({
      status: 200,
      message: `Successfully deleted comment with ID ${commentId} from post with title: "${post.title}"`,
      data: post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// // like a comment in a post
// router.put("/posts/:postId/likecomments/:commentId", checkPermission, async (req, res) => {
//   const postId = req.params.postId;
//   const commentId = req.params.commentId;
//   try {
//     const post = await postDao.likeComment(postId, commentId);

//     res.json({
//       status: 200,
//       message: `Successfully updated comment with ID ${commentId} for post with title: "${post.title}"`,
//       data: post,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // dislike a comment in a post
// router.put("/posts/:postId/dislikecomments/:commentId", checkPermission, async (req, res) => {
//   const postId = req.params.postId;
//   const commentId = req.params.commentId;
//   try {
//     const post = await postDao.dislikeComment(postId, commentId);
//     res.json({
//       status: 200,
//       message: `Successfully updated comment with ID ${commentId} for post with title: "${post.title}"`,
//       data: post,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: error.message });
//   }
// });


// Add more routes to retrieve other fields as needed

module.exports = router;
