const db = require("./src/data/db.js");
const app = require("./src/index.js");
db.connect(process.env.REACT_APP_DB_URI);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  
  console.log(`OutOfTheNest API at http://localhost:${PORT}/`);
});
