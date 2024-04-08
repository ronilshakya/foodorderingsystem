const express = require('express');
const router = express.Router();
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const carouselController = require('../controllers/carouselController')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/carousel');
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

router.post('/addcarouselimage', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No image uploaded' });
    }
    carouselController.addCarouselImage(req,res);
}
);

router.get('/getcarouselimage', carouselController.getCarouselImages);
router.delete('/deletecarouselimage/:id', carouselController.deleteCarouselImageById)

module.exports = router