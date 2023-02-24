const express = require('express');
const router = express.Router();
const DB = require('../data/db.js');

router.get('/createCategory', (req, res) => {
    DB.category.createCategory(req.query.categoryName).then((result) => {
        res.send("hello");
    });
});

router.get('/getCategory', (req, res) => {
    DB.category.getCategory().then((result) => {
        res.send(result);
    });
});

module.exports = router;