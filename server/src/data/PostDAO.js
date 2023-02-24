import Post from "../model/Post.js"

class PostDAO {
    async createPost(title, content, category) {
        const doc = new Post({ title, content, category });
        await doc.save();
    }
    
    async getPost() {
        return await Post.find({});
    }
}

export default PostDAO;

