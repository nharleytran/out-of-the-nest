const db = require("./src/data/db.js");
const app = require("./src/app.js");
db.connect(process.env.REACT_APP_DB_URI);

if (process.env.PORT) {//server port, only work for local, undefine on when run on server
    app.listen(process.env.PORT, () => {
    
      console.log(`OutOfTheNest API at ${process.env.REACT_APP_API_URL}`);
    });
}

module.exports = app;
