import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: Number,
});

const Category = mongoose.model('Category', CategorySchema);

export default Category;