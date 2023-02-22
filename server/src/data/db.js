const mongoose = require("mongoose");
const category = require("./category.js");
const post = require("./post.js");
const dbUri = "mongodb://localhost:27017/hopout";
mongoose.set('strictQuery', false);



main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(dbUri);
}

module.exports = {
    category,
    post  
};