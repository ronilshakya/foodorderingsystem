// foodRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const foodController = require('../controllers/foodController');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/images');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });

router.post('/add', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No image uploaded' });
    }
    console.log(req.file)
    const imagePath = req.file.path;
    foodController.addFood(req, res, imagePath);
});

router.get('/getfoods',foodController.getFood);

router.delete('/deletefood/:id',foodController.deleteFood)

router.put('/updatefood/:id',foodController.updateFood)

module.exports = router;
