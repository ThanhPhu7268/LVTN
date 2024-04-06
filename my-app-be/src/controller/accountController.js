const accountService = require('../services/accountService')
const cartService = require('../services/cartService')

class accountController {
    async findAll(req, res) {
        let data = await accountService.findAll()
        res.json(data)
    }

    async create(req, res) {
        let account = req.body
        if (account) {
            await accountService.createCustomer(account.fullName, account.email, account.phone)
            let customer = await accountService.findOneByPhone(account.phone)
            await accountService.createAccount(account.username, account.password, customer[0].idkhachhang)
            await cartService.createCart(0, 0, customer[0].idkhachhang)
            res.json(customer)
        } else {
            res.json('Thất bại')
        }
    }

    async findOneByUsername(req, res) {
        let username = req.params.username
        let data = await accountService.findOneAccount(username)
        res.json(data)
    }

    // async update(req, res) {
    //     let id = req.params.id
    //     let newCategoryName = req.body.newCategoryName
    //     if (id && newCategoryName) {
    //         let data = await accountService.update(newCategoryName, id)
    //         res.json(data)
    //     } else {
    //         res.json("Xóa thất bại")
    //     }
    // }
    // async delete(req, res) {
    //     let id = req.params.id
    //     if (id) {
    //         let data = await accountService.delete(id)
    //         res.json(data)
    //     } else {
    //         res.json("Xóa thất bại")
    //     }

    // }

}
module.exports = new accountController()