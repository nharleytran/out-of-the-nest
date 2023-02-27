import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    posts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }]
  });
  

const Category = mongoose.model('Category', CategorySchema);

export default Category;