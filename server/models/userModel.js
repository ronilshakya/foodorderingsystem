const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type: String, 
        unique: true,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    createdAt:{
        type: String,
        default: () => new Date().toLocaleDateString('en-GB')
    },
    orderHistory:{
        type: Object,
        default: {}
    },
    profileImage:{
        type: String,
        default:"623cf5fd-7ced-482f-9fe6-040a400e6648-1711528698944.png"
    }
})
const User = new mongoose.model("User", userSchema)
module.exports = User