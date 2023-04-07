const Post = require("../model/Post.js");
const Category = require("../model/Category.js");
const User = require("../model/User.js");

class PostDAO {
  async createPost({
    title,
    objective,
    outcome,
    content,
    author,
    user_id,
    category_id,
    gpa,
    testscore,
    resume,
    extracurriculars,
    international,
    anonymous
  }) {
    const post = await Post.create({
      title,
      objective,
      outcome,
      content,
      author,
      user_id,
      category_id,
      gpa,
      testscore,
      resume,
      extracurriculars,
      international,
      anonymous
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

  async likePost(postId, user_id) {
    try {
      const post = await Post.findById(postId);
      if (!post) {
        throw new Error("Post not found");
      }
      post.like++;
      post.liked_id.push(user_id)
      await post.save(); // save the updated post to the database
      console.log(post);
      return post;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async dislikePost(postId, user_id) {
    try {
      console.log("HELLLO");

      const post = await Post.findById(postId);
      if (!post) {
        throw new Error("Post not found");
      }
      post.like--;
      post.liked_id = post.liked_id.filter((id) => id !== user_id);
      console.log(post);
      await post.save(); // save the updated post to the database
      console.log(post);
      return post;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  async getPostsByFilters(
    categoryId,
    sortBy,
    outcome,
    international
  ) {
    const filter = { category_id: categoryId };
    if (outcome) {
      filter.outcome = outcome;
    }
    if (international) {
      filter.international = international;
    }
    let sortParam = {};
    if (sortBy === "gpa_desc") {
      sortParam = { gpa: -1 };
    } else if (sortBy === "gpa_asc") {
      sortParam = { gpa: 1 };
    } else if (sortBy === "date_desc") {
      sortParam = { date: -1 };
    } else if (sortBy === "date_asc") {
      sortParam = { date: 1 };
    }

    const filteredPosts = await Post.find(filter).sort(sortParam);
    return filteredPosts;
  }

  async getComments(postId) {

    const post = await Post.findById(postId);
    return post.comments;
  }

  async createComment(postId, text, user_id) {
    const user = await User.findOne({ _id: user_id });


    const comment = {
      text: text,
      author: user.name,
      user_id: user_id,
      like: 0,
      dislike: 0
    }
    const post = await Post.findById(postId);
    post.comments.push(comment);
    await post.save();
    return post;
  }
  
  // Update a comment in a post
  async updateComment(postId, commentId, updatedComment) {
    const post = await Post.findById(postId);
    const commentIndex = post.comments.findIndex(comment => comment._id == commentId);
    post.comments[commentIndex] = updatedComment;
    await post.save();
    return post;
  }
  
  // Delete a comment from a post
  async deleteComment(postId, commentId) {
    const post = await Post.findById(postId);
    post.comments = post.comments.filter(comment => comment._id != commentId);
    await post.save();
    return post;
  }

  // async likeComment(postId, commentId) {
  //   try {
  //     const post = await Post.findById(postId);
  //     const commentIndex = post.comments.findIndex(comment => comment._id == commentId);
  //     if (!post) {
  //       throw new Error("Post not found");
  //     }
  //     post.comments[commentIndex].like++;
  //     post.comments[commentIndex].push(user_id);
  //     await post.save(); // save the updated post to the database
  //     console.log(post);
  //     return post;
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // }

  // async dislikeComment(postId, commentId) {

  //   try {
  //     const post = await Post.findById(postId);
  //     const commentIndex = post.comments.findIndex(comment => comment._id == commentId);
  //     if (!post) {
  //       throw new Error("Post not found");
  //     }
  //     post.comments[commentIndex].like--;
  //     post.comments[commentIndex].liked_id = post.comments[commentIndex].liked_id.filter((id) => id !== user_id);
  //     await post.save(); // save the updated post to the database
  //     return post;
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // }
  // // Add more functions to retrieve other fields as needed
}

module.exports = PostDAO;
