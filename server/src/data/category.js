const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema({
    name: String,
});

const Category = mongoose.model("category", CategorySchema);
async function createCategory(categoryName) {
    const doc = new Category({ name: categoryName });
    await doc.save();
}

async function getCategory() {
    return await Category.find({});
}
module.exports = {
    getCategory,
    createCategory,
};
