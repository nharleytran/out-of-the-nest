const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  objective: String,

  outcome: String,

  content: {
    type: String,
    required: true,
  },

  author: {
    type: String,
    required: false,
  },
  user_id: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },

  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },

  gpa: Number,

  testscore: String,

  resume: String,

  extracurriculars: [String],

  international: Boolean,

  anonymous: Boolean,

  comments: [
    {
      text: String,
      author: {
        type: String,
        required: false,
      },
      user_id: {
        type: String,
        required: true,
      },
      like: {
        type: Number,
        default: 0,
      },
      dislike: {
        type: Number,
        default: 0,
      },
    },
  ],
  like: {
    type: Number,
    default: 0,
  },
  dislike: {
    type: Number,
    default: 0,
  },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
