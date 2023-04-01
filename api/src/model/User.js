const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  school: {
    type: String,
  },
  interests: {
    type: String,
  },
  bio: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  profileImage: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
