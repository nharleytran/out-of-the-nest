import Category from "../model/Category.js"

class CategoryDAO {  
    async getCategory() {
        const filter = {};
        const categories = await Category.find(filter);
        return categories;
    }
}

export default CategoryDAO;


