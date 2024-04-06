var express = require('express')
var router = express.Router()

const filterwm = require("../controller/filterwmController")

router.get('/size', filterwm.findSize)
router.get('/machine', filterwm.findMachine)
router.get('/type', filterwm.findType)
router.get('/material', filterwm.findMaterial)
router.get('/thuonghieu', filterwm.findBrand)
router.get('/nu', filterwm.findProductByWoman)
router.get('/chatlieu/:chatlieu', filterwm.findProductByMaterial)
router.get('/kieumat/:kieumat', filterwm.findProductByType)
router.get('/kichthuoc/:kichthuoc', filterwm.findProductBySize)
router.get('/loaimay/:loaimay', filterwm.findProductByMachine)



module.exports = router 