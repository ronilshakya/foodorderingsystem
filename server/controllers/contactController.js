const Contact = require('../models/contactModel');

exports.addContact = async (req,res) =>{
    try {
        const contact = await Contact.findOne({
            fullName: req.body.fullName,
            subject: req.body.subject
        })
        if(contact){
            return res.status(400).json({error:"contact already exists with same subject"})
        }
        const {fullName,email,subject,message} = req.body;
        const contactToAdd = await Contact.create({
            fullName: fullName,
            email: email,
            subject: subject,
            message: message
        })
        if(!contactToAdd){
            return res.status(400).json({message:"Something went wrong"});
        }
        res.send(contactToAdd);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.getAllContacts = async (req,res) =>{
    try {
        const contactsToGet = await Contact.find();
        if(!contactsToGet){
            return res.status(400).json({message: "No Contacts Found"})
        }
        res.status(200).json(contactsToGet)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}