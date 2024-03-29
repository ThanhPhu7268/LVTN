var express = require('express')
var router = express.Router()

const products = require("../controller/productController")

router.get('/', products.findAll)
router.get('/productbrand', products.findProductByBrand)
// router.get('/:id', products.findOneById)

module.exports = router 