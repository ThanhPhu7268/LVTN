var express = require('express')
var router = express.Router()

const analystController = require("../controller/analystController")

router.get('/', analystController.ordersIn7Days)
router.get('/total', analystController.findTotalOrder)
router.get('/allrevenue', analystController.findAllRevenue)
router.get('/totalsale', analystController.findTotalOrderSale)
router.get('/revenuemonth', analystController.findRevenueMonth)


module.exports = router 