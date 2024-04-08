const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    fullName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    dateOfSubmission:{
        type: String,
        default: () => new Date().toLocaleDateString('en-GB')
    }
})

const Contact = mongoose.model('Contact',contactSchema);

module.exports = Contact