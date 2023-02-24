import app from "./src/index.js";

const PORT = process.env.PORT || 6660;

app.listen(PORT, () => {
  
  console.log(`OutOfTheNest API at http://localhost:${PORT}/`);
});