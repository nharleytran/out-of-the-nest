import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  password_hash: {
    type: String,
    required: true,
  }
});

const User = mongoose.model("User", UserSchema);

export default User;
