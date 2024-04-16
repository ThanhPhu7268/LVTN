var express = require('express')
var router = express.Router()

const products = require("../controller/productController")

// router.get('/:id', products.findOneById)
router.get('/', products.findAll)
router.get('/Menhome', products.findProductHome)
router.get('/WMenhome', products.findProductHomeWm)
router.get('/CPhome', products.findProductHomeCp)
router.get('/productbrand', products.findProductByBrand)
router.post('/', products.create)
router.delete('/:id', products.delete)

module.exports = router