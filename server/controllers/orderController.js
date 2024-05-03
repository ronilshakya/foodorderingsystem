const Order = require('../models/orderModel');

exports.addOrder = async (req,res,next) =>{
    try{
        const {orderUser, orderStatus, orderFoodsHistory, orderTime } = req.body;
        const orderToAdd = await Order.create({
            orderUser: orderUser,
            orderStatus: orderStatus,
            orderFoodsHistory: orderFoodsHistory,
            orderTime: orderTime
        })
        if(!orderToAdd){
            res.status(400).json({message: "Failed to create order"});
        }
        res.status(200).json({message: "Order placed successfully"});
    }catch(error){
        next(error);
    }
}

exports.updateOrder = async (req,res,next) =>{
    try {
        const orderToUpdate = await Order.findByIdAndUpdate(req.params.id,{
            orderStatus : req.body.orderStatus
        })
        if(!orderToUpdate){
            res.status(400).json({message: "Update failed"})
        }
        res.status(200).json({message: "Update success"})
    } catch (error) {
        next(error)
    }
}

exports.getOrder = async (req,res,next) =>{
    try {
        const ordersToGet = await Order.find();
        if(!ordersToGet){
            res.status(400).json({message: "No Orders Found"})
        }
        res.status(200).json(ordersToGet)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.getOrderByUsername = async (req,res,next) =>{
    try {
        const orderByUsername = await Order.find({orderUser: req.params.username});
        if(!orderByUsername){
            res.status(400).json({message: "No Orders Found For this username"})
        }
        res.status(200).json(orderByUsername)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}