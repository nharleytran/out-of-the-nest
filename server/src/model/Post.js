import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    category: Number,
});

const Post = mongoose.model('Post', PostSchema);

export default Post;