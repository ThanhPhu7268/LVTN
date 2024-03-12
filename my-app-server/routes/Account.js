const express = require("express")
const router = express.Router()

const AccountController = require('../controllers/Account')

router.post('/register', AccountController.register)
router.post('/login', AccountController.login)

module.exports = router