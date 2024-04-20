const productService = require('../services/productService')


class products {
    async findAll(req, res) {
        let data = await productService.findALl()
        res.json(data)
    }

    async findOneById(req, res) {
        let name = req.params.id
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

    async findProductHomeCp(req, res) {
        let data = await productService.findProductHomeCp()
        res.json(data)
    }

    async create(req, res) {
        let product = req.body
        let avatar = req.file.filename
        if (product) {
            let data = await productService.create(product.tenSP, product.gia, product.moTa, product.gioiTinh, product.idchatlieu,
                product.idkieumat, product.idthuonghieu, product.idkichthuoc, product.idloaimay, avatar)
            res.json(data)
        } else {
            res.json('Thất bại')
        }
    }

    async update(req, res) {
        const tenSP = req.body.tenSP;
        const gia = req.body.gia;
        const moTa = req.body.moTa;
        const gioiTinh = req.body.gioiTinh;
        const idchatlieu = req.body.idchatlieu;
        const idkieumat = req.body.idkieumat;
        const idkichthuoc = req.body.idkichthuoc;
        const idthuonghieu = req.body.idthuonghieu;
        const idloaimay = req.body.idloaimay;
        const idSP = req.body.idSP;
        try {
            await productService.update(tenSP, gia, moTa, gioiTinh, idchatlieu, idkieumat, idthuonghieu, idkichthuoc, idloaimay, idSP)
            res.status(200).json({ message: 'Đã cập nhật sản phẩm thành công' });
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật sản phẩm' });
        }
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