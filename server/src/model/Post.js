import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    date: {
        type: Date,
        default: Date.now
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    gpa: Number,
    resume: String, // assuming that you will store the file path here
    extracurriculars: [String]
});

const Post = mongoose.model('Post', PostSchema);

export default Post;