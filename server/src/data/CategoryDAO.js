import Category from "../model/Category.js"

class CategoryDAO {  
    async getCategory() {
        const filter = {};
        if (name) {
          filter.name = name;
        }
        const decks = await Deck.find(filter);
        return decks;
    }
}

export default CategoryDAO;


