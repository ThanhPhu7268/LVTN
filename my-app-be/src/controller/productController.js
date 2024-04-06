const productService = require('../services/productService')


class products {
    async findAll(req, res) {
        let data = await productService.findALl()
        res.json(data)
    }

    async findOneById(req, res) {
        let name = req.params.name
        let data = await productService.findOneById(name)
        res.json(data)
    }

    async findProductByBrand(req, res) {
        let data = await productService.findProductByBrand()
        res.json(data)
    }

    async findProductHome(req, res) {
        let data = await productService.findProductHome()
        res.json(data)
    }

    async findProductHomeWm(req, res) {
        let data = await productService.findProductHomeWm()
        res.json(data)
    }
    async create(req, res) {
        let product = req.body
        let avatar = req.file.filename
        if (product) {
            let data = await productService.create(product.name, product.price, product.description,
                product.quantity, product.category, avatar)
            res.json(data)
        } else {
            res.json('Thất bại')
        }
    }

    async update(req, res) {
        let data = await productService.update()
        res.json(data)
    }
    async delete(req, res) {
        let id = req.params.id
        if (id) {
            let data = await productService.delete(id)
            res.json(data)
        } else {
            res.json("Xóa thất bại")
        }
    }




}

module.exports = new products()