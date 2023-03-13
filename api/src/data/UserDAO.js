const User = require("../model/User.js");

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

  async findUserByEmail(email) {
    const user = await User.findOne({ email: email });
    return user;
  }

  async deleteUserByEmail(email) {
    await User.deleteOne({email});
  }
}

module.exports = UserDAO;