const express = require('express')
const router = express.Router();
const orderController = require('../controllers/orderController')

router.post('/addorder',orderController.addOrder)
router.get('/getorder',orderController.getOrder)
router.get('/getorderbyusername/:username',orderController.getOrderByUsername)
router.get('/getorderbyid/:id',orderController.getOrderById)
router.put('/updateorder/:id',orderController.updateOrder);
router.delete('/deleteorder/:id',orderController.deleteOrder);

module.exports = router