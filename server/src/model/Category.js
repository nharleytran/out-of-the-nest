import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    categories: {
        type: [String],
        default: ['Software Engineering', 'Medical School', 'Consulting', 'Graduate Programs', 'Other Engineering Professions']
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
});

const Category = mongoose.model('Category', CategorySchema);

export default Category;