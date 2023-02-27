import Post from "../model/Post.js"
import Category from "../model/Category.js"

class PostDAO {
    async createPost({ title, outcome, content, author, category_id, gpa, testscore, resume, extracurriculars }) {
        const post = await Post.create({
          title,
          outcome,
          content,
          author,
          category_id,
          gpa,
          testscore,
          resume,
          extracurriculars
        });

        // Add the post to the category's "posts" array
        await Category.updateOne({ _id: category_id }, { $push: { posts: post._id } });
        return post;
      }

    async getPost(postId) {
        const post = await Post.findById(postId);
        console.log(post);
        if (!post) {
          throw new Error('Post not found');
        }
        return post;
      }

    async getPostsByCategory(categoryId) {
      const post =  await Post.find({category_id: categoryId})
      if (!post) {
        throw new Error('Post not found');
      }
      return post;
    }
    
    async  deletePost(postId) {
        const post = await Post.findById(postId);
        if (!post) {
          throw new Error('Post not found');
        }
        await Category.updateOne({ _id: post.category }, { $pull: { posts: post._id } });
        await post.delete();
        return post;
    }

    async updatePost(postId, updatedFields) {
        const post = await Post.findById(postId);
        console.log(post);
        if (!post) {
          throw new Error('Post not found');
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
      
      
      // Add more functions to retrieve other fields as needed
      
      
}

export default PostDAO;

