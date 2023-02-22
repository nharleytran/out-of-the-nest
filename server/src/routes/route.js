import * as DB from '../data/db.js';

// Anh's code:
export const getRoute = function(app){

    app.get('/getCategory', (req, res) => {
        DB.getCategory().then((result) => {
            res.send(result);
        });
    });
    app.get('/getPost', (req, res) => {
        DB.getPost(req.category).then((result) => {
            console.log(req.category);

            res.send({cat:req.category});
            res.send(result);
        });
    });
    

    //other routes..
}