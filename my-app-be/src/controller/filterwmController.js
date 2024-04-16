const filterwmService = require('../services/filterwmService')


class filterwmType {
    async findBrand(req, res) {
        let data = await filterwmService.findBrand()
        res.json(data)
    }

    //tìm theo thương hiệu
    async findProductByBrand(req, res) {
        let thuonghieu = req.params.thuonghieu
        let data = await filterwmService.findProductByBrand(thuonghieu)
        res.json(data)
    }

    async findType(req, res) {
        let data = await filterwmService.findType()
        res.json(data)
    }
    async findProductByType(req, res) {
        let kieumat = req.params.kieumat
        let data = await filterwmService.findProductByType(kieumat)
        res.json(data)
    }

    //tìm theo kích thước
    async findSize(req, res) {
        let data = await filterwmService.findSize()
        res.json(data)
    }
    async findProductBySize(req, res) {
        let kichthuoc = req.params.kichthuoc
        let data = await filterwmService.findProductBySize(kichthuoc)
        res.json(data)
    }
    //Tìm theo loại máy
    async findProductByMachine(req, res) {
        let loaimay = req.params.loaimay
        let data = await filterwmService.findProductByMachine(loaimay)
        res.json(data)
    }

    async findMachine(req, res) {
        let data = await filterwmService.findMachine()
        res.json(data)
    }

    async findMaterial(req, res) {
        let data = await filterwmService.findMaterial()
        res.json(data)
    }
    async findProductByMaterial(req, res) {
        let chatlieu = req.params.chatlieu
        let data = await filterwmService.findProductByMaterial(chatlieu)
        res.json(data)
    }

    async findProductByWoman(req, res) {
        let data = await filterwmService.findProductByWoman()
        res.json(data)
    }
}

module.exports = new filterwmType()