const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/userModel');

// Register User
exports.signup = async (req, res, next) => {
    try {
        const user = await User.findOne({email : req.body.email});

        if(user){
            res.status(400).json({message: "User already exists"});
        }

        let salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password,salt);

        const newUser = await User.create({
            ...req.body,
            password : hashedPassword
        })

        const token = jwt.sign(
            {_id: newUser._id},
            'secretkey123',
            {expiresIn : '90d'}
        )

        res.status(201).json({
            status:"Success", 
            message:"user registered successfully",
            token,
            user:{
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                orderHistory: newUser.orderHistory
            }
        });

    } catch (error) {
        next(error)
    }
};

// Sign in User
exports.signin = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            res.status(404).json({messsage:"User not found"})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            res.status(401).json({message: "Invalid Email or Password"});
        }

        const token = jwt.sign(
            {_id: user._id},
            'secretkey123',
            {expiresIn : '90d'}
        )

        res.status(201).json({
            status: "success", 
            message:"Logged in successfully", 
            token,
            user:{
                _id: user._id,
                username: user.username,
                email: user.email,
                orderHistory: user.orderHistory
            }
        })
    } catch (error) {
        next(error);
    }
};

exports.getAllUsers = async (req, res, next) =>{
    try {
        let users = await User.find({},{password:0});
        if(!users){
            res.status(404).json({message:"No Users found"});
        }
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

exports.removeUser = async (req,res,next) =>{
    try{
        const userToDelete = await User.findByIdAndDelete(req.params.id);
        if(!userToDelete){
            res.status(400).json({message:"User not found"});
        }else{
            res.status(200).json({message: "User removed successfully"});
        }
    }catch(error){
        next(error);
    }
} 

exports.updateUser = async (req,res,next) =>{
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id,{
            username: req.body.username
        },{new:true})
        if(!updateUser){
            res.status(400).json({message: "Something went wrong"})
        }
        res.send(updateUser)
    } catch (error) {
        return res.status(400).json({ error: error })
    }
}

// add order history

exports.addOrder = async (req, res, next) => {
    try {
        const orderHistoryItem = await User.findByIdAndUpdate(
            req.params.id,
            { $push: { orderHistory: req.body.orderHistory } },
            { new: true }
        );

        if (!orderHistoryItem) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(orderHistoryItem);
    } catch (error) {
        next(error);
    }
};

// get OrderHistory of id
exports.getOrderHistory = async (req,res,next) =>{
    try {
        const order = await User.findById(req.params.id,'orderHistory');
        if(!order){
            res.status(400).json({error: "User Not Found"})
        }
        res.status(200).json(order)
    } catch (error) {
        next(error)
    }
}

exports.addProfilePic = async(req,res,next)=>{
    try {
        const userProfile = await User.findByIdAndUpdate(req.params.id,{
            profileImage: req.file.filename
        })
        if(!userProfile){
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
}

exports.getProfilePic = async (req,res,next) =>{
    try {
        const getImage = await User.findById(req.params.id,'profileImage')
        if(!getImage){
            res.status(400).json({message:"User not found"})
        }
        res.status(200).json(getImage);
    } catch (error) {
        next(error);
    }
}