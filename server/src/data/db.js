import { MongoClient } from "mongodb";
const uri = "mongodb://localhost:27017";
const DB_NAME = "hopout";
// write mongo client code here to connect to the database
// Anh's code:
const client = await MongoClient.connect(uri, { useNewUrlParser: true });
const db = client.db(DB_NAME);
export async function getCategory() {
    const categories = await db.collection("category").find().toArray();
    return categories;
}

// Anh's code:
// create new category in the database
async function createCategory(categoryName) {
    const result = await db.collection("categories").insertOne({ _id: categoryName, });
    return result;
}

// Anh's code:
// create get the post in each category
export async function getPost(category) {
    const result = await db.collection("posts").find({ category: category }).toArray();
    return result;
}

// Anh's code:
// create post in category
async function createPost(categoryId, post) {
    const db = client.db(DB_NAME);
    const result = await db
        .collection("categories")
        .updateOne({ _id: categoryId }, { $push: { posts: post } });
    return result;
}
