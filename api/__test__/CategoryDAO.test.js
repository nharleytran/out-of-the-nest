const Category = require("../src/model/Category.js");
const CategoryDAO = require("../src/data/CategoryDAO.js");

describe("CategoryDAO", () => {
  describe("getCategory", () => {
    it("should return an array of categories", async () => {
      const categories = [{ name: "Category 1" },{ name: "Category 2" },{ name: "Category 3" },];
      Category.find = jest.fn().mockResolvedValue(categories);
      const categoryDAO = new CategoryDAO();

      const result = await categoryDAO.getCategory();

      expect(result).toEqual(categories);
      expect(Category.find).toHaveBeenCalledTimes(1);
      expect(Category.find).toHaveBeenCalledWith({});
    });
  });
});
