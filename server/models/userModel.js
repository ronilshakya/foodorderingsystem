const mongoose = require('mongoose');
// User schema
const userSchema = mongoose.Schema({
    username:{
        type: String, 
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    createdAt:{
        type: String,
        default: () => new Date().toLocaleDateString('en-GB')
    }  
})
const User = new mongoose.model("User", userSchema)
module.exports = User