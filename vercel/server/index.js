const db = require("./src/data/db.js");
const app = require("./src/app.js");
db.connect(process.env.REACT_APP_DB_URI);

if (process.env.PORT) {
    app.listen(process.env.PORT, () => {
      
      console.log(`OutOfTheNest API at http://localhost:${PORT}/`);
    });
}

module.exports = app;
