const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const foodSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }, 
    price: {
        type: Number,
        required: true
    },
    category:{
        type: String,        
        required: true
    },
    image: {
        type: String
    },

});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;