
// import express from 'express';
// import * as route from './src/routes/route.js';

const express = require('express');
const router = require('./src/routes/route.js');
const app = express();

app.listen(3003, () => {
    console.log('Server is running on port 3003');
});
app.use('/', router);
// route.getRoute(app);



