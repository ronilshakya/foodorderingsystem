const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderUser:{
        type: String,
        required: true
    },
    orderStatus:{
        type: String,
        default: "Order Placed"
    },
    orderFoodsHistory:{
        type: Object,
        default: {}
    },
    orderTime:{
        type: String,
        required: true
    },
    orderAddress:{
        type: String,
        required: true
    }
})

const Order = new mongoose.model('Order', orderSchema);
module.exports = Order