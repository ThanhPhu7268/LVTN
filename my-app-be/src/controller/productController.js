const productService = require('../services/productService')


class products {
    async findAll(req, res) {
        let data = await productService.findALl()
        res.json(data)
    }

    async findBrand(req, res) {
        let data = await productService.findBrand()
        res.json(data)
    }
    //tìm theo thương hiệu
    async findProductByBrand(req, res) {
        let thuonghieu = req.params.thuonghieu
        let data = await productService.findProductByBrand(thuonghieu)
        res.json(data)
    }

    async findProductByMaterial(req, res) {
        let chatlieu = req.params.chatlieu
        let data = await productService.findProductByMaterial(chatlieu)
        res.json(data)
    }

    async findProductByType(req, res) {
        let kieumat = req.params.kieumat
        let data = await productService.findProductByType(kieumat)
        res.json(data)
    }

    async findProductBySize(req, res) {
        let kichthuoc = req.params.kichthuoc
        let data = await productService.findProductBySize(kichthuoc)
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
    async findAllByCategoryId(req, res) {
        let categoryId = req.params.id
        let data = await productService.findAllByCategoryId(categoryId)
        res.json(data)
    }

    async findOneById(req, res) {
        let id = req.params.id
        let data = await productService.findOneById(id)
        res.json(data)
    }



}

module.exports = new products()