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
    }
})
const User = new mongoose.model("User", userSchema)
module.exports = User