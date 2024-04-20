var express = require('express')
var router = express.Router()

const products = require("../controller/productController")
const multer = require('multer');
const upload = multer({ dest: './src/public/upload/' })

router.get('/', products.findAll)
router.get('/Menhome', products.findProductHome)
router.get('/WMenhome', products.findProductHomeWm)
router.get('/CPhome', products.findProductHomeCp)
router.get('/productbrand', products.findProductByBrand)
router.post('/', upload.single('anhDaiDien'), products.create)
router.put('/update/', products.update)
router.delete('/:id', products.delete)
router.get('/:id', products.findOneById)


module.exports = router