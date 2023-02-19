
import express from 'express';
import * as route from './src/routes/route.js';

const app = express();

app.listen(3003, () => {
    console.log('Server is running on port 3003');
});
route.getRoute(app);
// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Simple Express App' });
// });

// app.get('/getCategory', (req, res,next) => {
//     DB.getCategory().then((result) => {
//         res.send(result);
//     });
// });
// app.use('/getCategory', router);


//import route



