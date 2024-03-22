var express = require('express')
var router = express.Router()

const accountController = require("../controller/accountController")

router.get('/:username', accountController.findOneByUsername)
router.post('/', accountController.create)
// router.put('/:id', accountController.update)
// router.delete('/:id', accountController.delete)





module.exports = router 