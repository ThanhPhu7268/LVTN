const cartService = require('../services/cartService')


class cartController {
    async findAllById(req, res) {
        let data = await cartService.findAllById(req.query.id)
        res.json(data)
    }

    async createCart(req, res) {
        let cart = req.body
        if (cart) {
            await cartService.createCart(cart.quantity, cart.total, cart.idkhachhang)
            res.json("Thành công")
        } else {
            res.json('Thất bại')
        }
    }

    async createCartDetail(req, res) {
        let cartDetail = req.body
        if (cartDetail) {
            await cartService.createCartDetail(cartDetail.quantity, cartDetail.idcart, cartDetail.idproduct)
            res.json("Thành công")
        } else {
            res.json('Thất bại')
        }
    }

    async findOneByUsername(req, res) {
        let username = req.params.username
        let data = await accountService.findOneAccount(username)
        res.json(data)
    }

    async findIdCartByIdUser(req, res) {
        let iduser = req.params.iduser
        let data = await cartService.findIdCartByIdUser(iduser)
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
    async delete(req, res) {
        let id = req.params.id
        if (id) {
            let data = await cartService.delete(id)
            res.json(data)
        } else {
            res.json("Xóa thất bại")
        }

    }

}
module.exports = new cartController()