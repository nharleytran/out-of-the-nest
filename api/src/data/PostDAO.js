const Post = require("../model/Post.js");
const Category = require("../model/Category.js");

class PostDAO {
  async createPost({
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
  }) {
    const post = await Post.create({
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

    // Add the post to the category's "posts" array
    await Category.updateOne(
      { _id: category_id },
      { $push: { posts: post._id } }
    );
    return post;
  }

  async getPost(postId) {
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("Post not found");
    }
    return post;
  }

  async getPostsByCategory(categoryId) {
    const post = await Post.find({ category_id: categoryId });
    if (!post) {
      throw new Error("Post not found");
    }
    return post;
  }

  async deletePost(postId) {
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("Post not found");
    }
    await Category.updateOne(
      { _id: post.category_id },
      { $pull: { posts: post._id } }
    );
    await Post.findOneAndDelete({ _id: postId });
    return post;
  }

  async updatePost(postId, updatedFields) {
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("Post not found");
    }

    // update the fields with the new values
    if (updatedFields.title) {
      post.title = updatedFields.title;
    }
    if (updatedFields.outcome) {
      post.outcome = updatedFields.outcome;
    }
    if (updatedFields.content) {
      post.content = updatedFields.content;
    }
    if (updatedFields.author) {
      post.author = updatedFields.author;
    }
    if (updatedFields.resume) {
      post.resume = updatedFields.resume;
    }
    if (updatedFields.gpa) {
      post.gpa = updatedFields.gpa;
    }
    if (updatedFields.testscore) {
      post.testscore = updatedFields.testscore;
    }
    if (updatedFields.extracurriculars) {
      post.extracurriculars = updatedFields.extracurriculars;
    }

    // save the updated post to the database
    const updatedPost = await post.save();
    return updatedPost;
  }

  async getPostsByFilters(
    categoryId,
    startDate,
    endDate,
    minGPA,
    maxGPA,
    testname,
    outcome
  ) {
    const filter = { category: categoryId };
    if (startDate && endDate) {
      filter.date = { $gte: startDate, $lte: endDate };
    }
    if (minGPA || maxGPA) {
      filter.gpa = {};
      if (minGPA) filter.gpa.$gte = parseFloat(minGPA);
      if (maxGPA) filter.gpa.$lte = parseFloat(maxGPA);
    }
    if (testname) {
      filter["testscore.testname"] = testname;
    }
    if (outcome) {
      filter.outcome = outcome;
    }

    const filteredPosts = await Post.find(filter);
    return filteredPosts;
  }

  // Add more functions to retrieve other fields as needed
}

module.exports = PostDAO;
