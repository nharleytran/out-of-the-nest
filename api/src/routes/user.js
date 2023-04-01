const express = require("express");
const UserDAO = require("../data/UserDAO.js");
const { hashPassword } = require("../util/password.js");
const jwt = require("jsonwebtoken");
const { checkPermission } = require("./auth.js");
const multer = require('multer');

const router = express.Router();
const userDao = new UserDAO();

 
// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './public/')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });
 
// var upload = multer({ storage: storage });
const GridFsStorage = require('multer-gridfs-storage');
// create storage engine
const storage = new GridFsStorage({
  url: config.mongoURI,
  file: (req, file) => {
      return new Promise((resolve, reject) => {
          crypto.randomBytes(16, (err, buf) => {
              if (err) {
                  return reject(err);
              }
              const filename = buf.toString('hex') + path.extname(file.originalname);
              const fileInfo = {
                  filename: filename,
                  bucketName: 'uploads'
              };
              resolve(fileInfo);
          });
      });
  }
});

const upload = multer({ storage });

router.post("/user/image", upload.single('file'), (req, res, next) => {
    console.log(req.body);
    // check for existing images
    Image.findOne({ caption: req.body.caption })
        .then((image) => {
            console.log(image);
            if (image) {
                return res.status(200).json({
                    success: false,
                    message: 'Image already exists',
                });
            }

            let newImage = new Image({
                caption: req.body.caption,
                filename: req.file.filename,
                fileId: req.file.id,
            });

            newImage.save()
                .then((image) => {

                    res.status(200).json({
                        success: true,
                        image,
                    });
                })
                .catch(err => res.status(500).json(err));
        })
        .catch(err => res.status(500).json(err));
})
.get((req, res, next) => {
    Image.find({})
        .then(images => {
            res.status(200).json({
                success: true,
                images,
            });
        })
        .catch(err => res.status(500).json(err));
});


router.post("/user/create", async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const user = await userDao.createUser({
      email,
      name,
      password: hashPassword(password),
    });
    res.json({
      status: 200,
      message: `Successfully created user "${user.email}"`,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/user/profile/:userId", checkPermission, async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await userDao.findUserById(userId);
    res.json({
      status: 200,
      message: `Successfully get user "${user.email}"`,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.put("/user/update/:userId", checkPermission, upload.single("profileImage"), async (req, res) => {
  const postId = req.params.userId;
  const updatedFields = req.body;
  const url = req.protocol + '://' + req.get('host')
  console.log(61,url)

  try {
    const updatedPost = await userDao.updateUserProfile(postId, updatedFields);
    res.json({
      status: 200,
      message: "user profile updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.delete("/user/email/delete/:email", async (req, res) => {
  const { email } = req.params;

  try {
    await userDao.deleteUserByEmail(email);
    res.json({
      status: 200,
      message: `Successfully deleted user "${email}"`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
