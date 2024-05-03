const commentService = require('../services/commentService')

class commentType {
    async findCommentByProductID(req, res) {
        let id = req.params.id
        let data = await commentService.findCommentByProductID(id)
        res.json(data)
    }

    async create(req, res) {
        const { idsanpham, idtaikhoan, sao, noidung } = req.body;
        let data = await commentService.create(idsanpham, idtaikhoan, sao, noidung)
        res.json(data)
    }
}

module.exports = new commentType()