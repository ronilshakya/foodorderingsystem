const express = require('express')
const authController = require('../controllers/authController')

const router = express.Router();

router.post('/signup',authController.signup);
router.post('/signin',authController.signin);
router.get('/getallusers',authController.getAllUsers);
router.delete('/deleteuser/:id',authController.removeUser);

module.exports = router;