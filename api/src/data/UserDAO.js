const User = require("../model/User.js");
const multer = require('multer');
class UserDAO {
  async createUser({ email, name, password }) {
    const user = await User.create({
      email,
      name,
      password,
    });

    return user;
  }

  async dropAll() {
    await User.deleteMany({});
  }

  async findUserById(id) {
    const user = await User.findOne({ _id: id });
    return user;
  }
  async findUserByEmail(email) {
    const user = await User.findOne({ email: email });
    return user;
  }

  async updateUserProfile(userId, updatedFields) {
    const user = await User.findOneAndUpdate({ _id: userId }, updatedFields);
    return user;
  }
  async deleteUserByEmail(email) {
    await User.deleteOne({email});
  }
}

module.exports = UserDAO;
