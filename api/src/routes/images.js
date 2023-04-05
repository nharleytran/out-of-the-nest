const express = require("express");
const {uploadMiddleware, gfs} = require('../data/db.js');
const router = express.Router();
router.post('/image/upload/',uploadMiddleware, async (req, res) => {
    // get the .file property from req that was added by the upload middleware
    console.log(req.file);
    console.log(req.body);
    const { file } = req;
    // and the id of that new image file
    const { id } = file;
    // we can set other, smaller file size limits on routes that use the upload middleware
    // set this and the multer file size limit to whatever fits your project
    if (file.size > 5000000) {
        // if the file is too large, delete it and send an error
        deleteImage(id);
        return res.status(400).send('file may not exceed 5mb');
    }
    console.log('uploaded file: ', file);
    return res.send(file.id);
});

const deleteImage = (id) => {
    if (!id || id === 'undefined') return res.status(400).send('no image id');
    const _id = new mongoose.Types.ObjectId(id);
    gfs.delete(_id, (err) => {
        if (err) return res.status(500).send('image deletion error');
    });
};

// this route will be accessed by any img tags on the front end which have
// src tags like
// <img src="/api/image/123456789" alt="example"/>
// <img src={`/api/image/${user.profilePic}`} alt="example"/>
router.get('/image/:id', ({ params: { id } }, res) => {
    // if no id return error
    if (!id || id === 'undefined') return res.status(400).send('no image id');
    // if there is an id string, cast it to mongoose's objectId type
    const _id = new mongoose.Types.ObjectId(id);
    // search for the image by id
    gfs.find({ _id }).toArray((err, files) => {
        if (!files || files.length === 0)
            return res.status(400).send('no files exist');
        // if a file exists, send the data
        gfs.openDownloadStream(_id).pipe(res);
    });
});

module.exports = router;