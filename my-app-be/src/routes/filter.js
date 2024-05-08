var express = require('express')
var router = express.Router()

const filter = require("../controller/filterController")


router.get('/thuonghieu/:thuonghieu', filter.findProductByBrand)
router.get('/chatlieu/:chatlieu', filter.findProductByMaterial)
router.get('/kieumat/:kieumat', filter.findProductByType)
router.get('/kichthuoc/:kichthuoc', filter.findProductBySize)
router.get('/loaimay/:loaimay', filter.findProductByMachine)
router.get('/size', filter.findSize)
router.get('/machine', filter.findMachine)
router.get('/type', filter.findType)
router.get('/material', filter.findMaterial)
router.get('/thuonghieu', filter.findBrand)
router.get('/nu', filter.findProductByWoman)
router.get('/gioitinh', filter.findProductBySex)
router.get('/:id', filter.findOneById)
router.get('/timtheoten/:ten', filter.findProductByName)









module.exports = router 