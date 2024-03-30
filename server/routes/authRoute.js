const express = require('express')
const authController = require('../controllers/authController');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/userprofile');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
})
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({storage,fileFilter})
router.put('/adduserimage/:id', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No image uploaded' });
    }
    authController.addProfilePic(req,res)
}
);

router.post('/signup',authController.signup);
router.post('/signin',authController.signin);
router.get('/getallusers',authController.getAllUsers);
router.delete('/deleteuser/:id',authController.removeUser);
router.put('/updateuser/:id',authController.updateUser);
router.put('/addorderhistory/:id',authController.addOrder);
router.get('/getorderhistory/:id',authController.getOrderHistory);
router.get('/getuserimage/:id',authController.getProfilePic);


module.exports = router;