const orderService = require('../services/orderService')
class orderController {
    async findAll(req, res) {
        try {
            let orders = await orderService.findAll()
            res.status(200).json(orders);
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi tạo đơn hàng.' });
        }
    }

    async create(req, res) {
        const order = req.body;
        try {
            // Tạo đơn hàng chính
            await orderService.createOrder(order.nguoiDat, order.idkhachhang, order.sodienthoai, order.diachi, order.ghichu, order.tongGia, order.pttt);
            const orderId = await orderService.findOrderId();
            console.log(orderId[0].iddonhang);
            for (const product of order.sanPham) {
                console.log(product)
                await orderService.createOrderDetail(product.idproduct, orderId[0].iddonhang, product.quantity);
                let quantity = await orderService.findQuantity(product.idproduct)
                await orderService.updateQuatity(product.idproduct, quantity[0].soLuongCon, product.quantity)
            }
            // Lặp qua từng sản phẩm trong đơn hàng và tạo chi tiết đơn hàng cho mỗi sản phẩm
            res.status(200).json({ message: 'Đã tạo đơn hàng thành công.' });
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi tạo đơn hàng.' });
        }
    }

    async findAllByCustomerId(req, res) {
        try {
            const maKH = req.params.id
            let orders = await orderService.findAllByCustomerId(maKH)
            res.status(200).json(orders);
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi tạo đơn hàng.' });
        }
    }

    // async findAllByTinhTrangId(req, res) {
    //     try {
    //         const id = req.query.id
    //         let orders = await orderService.findAllByTinhTrangId(id)
    //         res.status(200).json(orders);
    //     } catch (error) {
    //         console.error('Đã xảy ra lỗi:', error);
    //         res.status(500).json({ message: 'Đã xảy ra lỗi khi tạo đơn hàng.' });
    //     }
    // }
    async findOneById(req, res) {
        let maDH = req.params.id
        try {
            let order = await orderService.findOneById(maDH)
            res.status(200).json(order);
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
            res.status(500).json({ message: 'Đã xảy ra lỗi.' });
        }
    }

    async findProductById(req, res) {
        let DH = req.params.id
        try {
            let order = await orderService.findProductById(DH)
            res.status(200).json(order);
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
            res.status(500).json({ message: 'Đã xảy ra lỗi.' });
        }
    }

    async updateTT(req, res) {
        const tinhTrang = req.body.tinhTrang;
        const maDH = req.params.id
        try {
            await orderService.update(tinhTrang, maDH)
            res.status(200).json({ message: 'Đã cập nhật đơn hàng thành công' });
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật đơn hàng' });
        }
    }

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
module.exports = new orderController()