var express = require('express')
var router = express.Router()

const orderController = require("../controller/orderController")


router.get('/', orderController.findAll)
// router.put('/thanhtoan/:id', orderController.updateTTTT)
router.get('/history/:id', orderController.findAllByCustomerId)
router.get('/detail/:id', orderController.findOneById)
router.get('/productdt/:id', orderController.findProductById)
router.post('/', orderController.create)
router.put('/update/:id', orderController.updateTT)
router.put('/cancel/:id', orderController.updateCancel)





module.exports = router 