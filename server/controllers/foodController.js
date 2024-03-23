// foodController.js
const Food = require('../models/foodModel');
const path = require('path')

exports.addFood = async (req, res) => {
    try {
        const { name, price, category } = req.body;
        const image = req.file.filename;

        const newFood = new Food({
            name,
            price,
            category,
            image
        });
        
        await newFood.save();
        res.json('Food Added');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
};

exports.getFood = async (req,res,next) =>{
    try{
        const fooditems = await Food.find();
        if(!fooditems){
            res.status(400).json({message:"Food Items not found"})
        }else{
            res.status(200).json(fooditems)
        }
    }catch(error){
        next(error)
    }
}
exports.deleteFood = async (req,res,next) =>{
    try{
        const deletedFoodItem = await Food.findByIdAndDelete(req.params.id);
        if(!deletedFoodItem){
            res.status(400).json({message:"Food item not found"})
        }else{
            res.status(200).json({message:"Food item removed successfully"})
        }
    }catch(error){
        next(error)
    }
}

exports.updateFood = async(req,res,next) =>{
    try {
        const updatedFood = await Food.findByIdAndUpdate(req.params.id,{
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        });
        if(!updatedFood){
            res.status(404).json({message: "Update failed"});
        }
        res.status(200).json({message: "Updated successfully",updatedFood});
        
    } catch (error) {
        next(error);
    }
}

