import app from "./src/index.js";
import * as db from "./src/data/db.js";
db.connect(process.env.DB_URI);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  
  console.log(`OutOfTheNest API at http://localhost:${PORT}/`);
});