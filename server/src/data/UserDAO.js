import User from "../model/User.js"

class UserDAO {
    async createUser({ email, name, password_hash }) {
        const user = await User.create({
            email,
            name,
            password_hash
        });

        await User.updateOne({ _id: category_id }, { $push: { posts: post._id } });
        return user;
      }
      
}

export default PostDAO;

