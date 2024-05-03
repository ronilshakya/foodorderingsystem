const express = require('express')
const router = express.Router();
const orderController = require('../controllers/orderController')

router.post('/addorder',orderController.addOrder)
router.get('/getorder',orderController.getOrder)
router.get('/getorderbyusername/:username',orderController.getOrderByUsername)
router.put('/updateorder/:id',orderController.updateOrder);

module.exports = router