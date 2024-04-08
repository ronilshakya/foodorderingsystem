const Carousel = require('../models/carouselModel');
const fs = require('fs');
const path = require('path')

exports.addCarouselImage = async (req,res,next) =>{
    try {
        const {filename} = req.file;
        const carousel = await Carousel.create({carouselImage: filename});
        res.status(201).json({ success: true, data: carousel });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
}

exports.getCarouselImages = async (req,res,next) =>{
    try {
        const images = await Carousel.find();
        if(!images || images.length === 0){
            return res.status(400).json({message: "Images not found"});
        }
        res.status(201).json(images)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.deleteCarouselImageById = async (req,res,next) =>{
    try {
        const image = await Carousel.findByIdAndDelete(req.params.id);
        if(!image){
            return res.status(400).json({message: 'Carousel Image Not Found'})
        }
        const imagePath = path.join(__dirname, '..', 'public', 'carousel', image.carouselImage);
        fs.unlink(imagePath, (err)=>{
            if(err){
                console.error('Error deleting file:', err);
                return res.status(500).json({ message: 'Error deleting file' });
            }
            console.log('File deleted successfully');
        })
        res.status(200).json({message: 'Carousel Image Deleted Successfully'})
    } catch (error) {
        console.error('Error deleting carousel image by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}