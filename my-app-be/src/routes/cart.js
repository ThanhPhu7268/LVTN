var express = require('express')
var router = express.Router()

const cartController = require("../controller/cartController")


router.get('/:iduser', cartController.findIdCartByIdUser)
router.post('/:id', cartController.createCartDetail)
router.get('/', cartController.findAll)


// router.put('/:id', cartController.update)
// router.delete('/:id', cartController.delete)





module.exports = router 