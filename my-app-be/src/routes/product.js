var express = require('express')
var router = express.Router()

const products = require("../controller/productController")

// const multer = require('multer');
// const upload = multer({ dest: './src/public/uploads/' })

router.get('/brand', products.findBrand)
router.get('/:id', products.findOneById)
router.get('/thuonghieu/:thuonghieu', products.findProductByBrand)
router.get('/chatlieu/:chatlieu', products.findProductByMaterial)
router.get('/kieumat/:kieumat', products.findProductByType)
router.get('/kichthuoc/:kichthuoc', products.findProductBySize)
// router.get('/category/:id', products.findAllByCategoryId)
router.get('/', products.findAll)
// router.post('/', upload.single('image'), products.create)
// router.put('/:id', products.findAll)
// router.delete('/:id', products.delete)





module.exports = router 