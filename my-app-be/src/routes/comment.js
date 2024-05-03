var express = require('express')
var router = express.Router()

const commentController = require("../controller/commentController")


router.get('/:id', commentController.findCommentByProductID)
router.post('/', commentController.create)


module.exports = router 