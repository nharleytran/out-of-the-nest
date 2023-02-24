import Category from "../model/Category.js"

class CategoryDAO {
    async createCategory({categoryName}) {
        const doc = new Category({ name: categoryName });
        await doc.save();
    }
    
    async getCategory() {
        return await Category.find({});
    }
}

export default CategoryDAO;


