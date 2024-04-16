const filtercpService = require('../services/filtercpService')


class filtercpType {
    async findBrand(req, res) {
        let data = await filtercpService.findBrand()
        res.json(data)
    }

    async findOneById(req, res) {
        let name = req.params.id
        let data = await filtercpService.findOneById(name)
        res.json(data)
    }

    //tìm theo thương hiệu
    async findProductByBrand(req, res) {
        let thuonghieu = req.params.thuonghieu
        let data = await filtercpService.findProductByBrand(thuonghieu)
        res.json(data)
    }

    async findType(req, res) {
        let data = await filtercpService.findType()
        res.json(data)
    }
    async findProductByType(req, res) {
        let kieumat = req.params.kieumat
        let data = await filtercpService.findProductByType(kieumat)
        res.json(data)
    }

    //tìm theo kích thước
    async findSize(req, res) {
        let data = await filtercpService.findSize()
        res.json(data)
    }
    async findProductBySize(req, res) {
        let kichthuoc = req.params.kichthuoc
        let data = await filtercpService.findProductBySize(kichthuoc)
        res.json(data)
    }
    //Tìm theo loại máy
    async findProductByMachine(req, res) {
        let loaimay = req.params.loaimay
        let data = await filtercpService.findProductByMachine(loaimay)
        res.json(data)
    }

    async findMachine(req, res) {
        let data = await filtercpService.findMachine()
        res.json(data)
    }

    async findMaterial(req, res) {
        let data = await filtercpService.findMaterial()
        res.json(data)
    }
    async findProductByMaterial(req, res) {
        let chatlieu = req.params.chatlieu
        let data = await filtercpService.findProductByMaterial(chatlieu)
        res.json(data)
    }

    async findProductBySex(req, res) {
        let data = await filtercpService.findProductBySex()
        res.json(data)
    }
}

module.exports = new filtercpType()