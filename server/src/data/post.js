const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    category: String,
});

const Post = mongoose.model("post", PostSchema);
async function createPost(title, content, category) {
    const doc = new Post({ title, content, category });
    await doc.save();
}

async function getPost() {
    return await Post.find({});
}
module.exports = {
    getPost,
    createPost,
};
