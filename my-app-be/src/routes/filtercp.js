var express = require('express')
var router = express.Router()

const filtercp = require("../controller/filtercpController")


router.get('/thuonghieu/:thuonghieu', filtercp.findProductByBrand)
router.get('/chatlieu/:chatlieu', filtercp.findProductByMaterial)
router.get('/kieumat/:kieumat', filtercp.findProductByType)
router.get('/kichthuoc/:kichthuoc', filtercp.findProductBySize)
router.get('/loaimay/:loaimay', filtercp.findProductByMachine)
router.get('/size', filtercp.findSize)
router.get('/machine', filtercp.findMachine)
router.get('/type', filtercp.findType)
router.get('/material', filtercp.findMaterial)
router.get('/thuonghieu', filtercp.findBrand)
router.get('/gioitinh', filtercp.findProductBySex)
router.get('/:id', filtercp.findOneById)







module.exports = router 