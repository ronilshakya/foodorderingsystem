const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post('/addcontact',contactController.addContact);
router.get('/getallcontacts',contactController.getAllContacts);

module.exports = router;