var express = require('express')
var router = express.Router()

const cartController = require("../controller/cartController")


router.get('/cartProducts', cartController.findAllById)
router.get('/:iduser', cartController.findIdCartByIdUser)
router.post('/', cartController.createCartDetail)
router.delete('/:id', cartController.delete)


// router.put('/:id', cartController.update)





module.exports = router 