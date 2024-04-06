const filterService = require('../services/filterService')


class filterType {
    async findBrand(req, res) {
        let data = await filterService.findBrand()
        res.json(data)
    }

    async findOneById(req, res) {
        let name = req.params.name
        let data = await filterService.findOneById(name)
        res.json(data)
    }

    //tìm theo thương hiệu
    async findProductByBrand(req, res) {
        let thuonghieu = req.params.thuonghieu
        let data = await filterService.findProductByBrand(thuonghieu)
        res.json(data)
    }

    async findType(req, res) {
        let data = await filterService.findType()
        res.json(data)
    }
    async findProductByType(req, res) {
        let kieumat = req.params.kieumat
        let data = await filterService.findProductByType(kieumat)
        res.json(data)
    }

    //tìm theo kích thước
    async findSize(req, res) {
        let data = await filterService.findSize()
        res.json(data)
    }
    async findProductBySize(req, res) {
        let kichthuoc = req.params.kichthuoc
        let data = await filterService.findProductBySize(kichthuoc)
        res.json(data)
    }
    //Tìm theo loại máy
    async findProductByMachine(req, res) {
        let loaimay = req.params.loaimay
        let data = await filterService.findProductByMachine(loaimay)
        res.json(data)
    }

    async findMachine(req, res) {
        let data = await filterService.findMachine()
        res.json(data)
    }

    async findMaterial(req, res) {
        let data = await filterService.findMaterial()
        res.json(data)
    }
    async findProductByMaterial(req, res) {
        let chatlieu = req.params.chatlieu
        let data = await filterService.findProductByMaterial(chatlieu)
        res.json(data)
    }

    async findProductBySex(req, res) {
        let data = await filterService.findProductBySex()
        res.json(data)
    }

    async findProductByWoman(req, res) {
        let data = await filterService.findProductByWoman()
        res.json(data)
    }
}

module.exports = new filterType()