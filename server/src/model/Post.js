import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    outcome: String,
    content: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
    gpa: Number,
    testscore: String,
    resume: String,
    extracurriculars: [String]
  });
  

const Post = mongoose.model('Post', PostSchema);

export default Post;