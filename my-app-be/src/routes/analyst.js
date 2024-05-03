var express = require('express')
var router = express.Router()

const analystController = require("../controller/analystController")

router.get('/', analystController.ordersIn7Days)

module.exports = router 