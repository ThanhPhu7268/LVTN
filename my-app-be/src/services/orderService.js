const con = require('../config/connectDB')


// Hàm tạo mã ID mới
const generateOrderId = () => {
    const characters = '0123456789abcdef';
    const idLength = 7; // Độ dài của phần ngẫu nhiên (7 ký tự)
    let orderId = '#H'; // Tiền tố của ID

    // Tạo ngẫu nhiên các ký tự cho phần ngẫu nhiên
    for (let i = 0; i < idLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        orderId += characters[randomIndex];
    }

    return orderId;
};

class orderService {

    findAll() {
        return new Promise((resolve, reject) => {
            con.query(`select a.iddonhang, a.maDH, a.tennguoidat, a.idkhachhang, a.sdt, 
            a.donhangngaylap, a.donhangdiachigiaohang, a.donhangghichu, 
            a.donhangtonggia, c.trangthai, c.trangthaicolor, c.trangthaibg, d.phuongthucthanhtoanten
            from donhang a, trangthai c, phuongthucthanhtoan d 
            where a.donhangtrangthai = c.idtrangthai
            and a.idphuongthucthanhtoan = d.idphuongthucthanhtoan order by iddonhang DESC;
            `, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    createOrder(nguoiDat, khachHang, sodienthoai, diaChi, ghiChu, tongGia, phuongthucthanhtoan) {
        return new Promise((resolve, reject) => {
            const maDH = generateOrderId(); // Tạo mã ID mới
            con.query(`INSERT INTO donhang(maDH, tennguoidat, idkhachhang, sdt, donhangngaylap,donhangdiachigiaohang, donhangghichu, donhangtonggia, donhangtrangthai, idphuongthucthanhtoan) 
            VALUES ('${maDH}', '${nguoiDat}', '${khachHang}', '${sodienthoai}', NOW(), '${diaChi}', '${ghiChu}', '${tongGia}', 1, '${phuongthucthanhtoan}');`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    findOrderId() {
        return new Promise((resolve, reject) => {
            con.query(`SELECT LAST_INSERT_ID() as iddonhang`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    createOrderDetail(maSP, maDH, soLuong) {
        return new Promise((resolve, reject) => {
            con.query(`insert into chitietdonhang (idsanpham, iddonhang, chitietdonhangsoluong) values(${maSP}, ${maDH}, ${soLuong});`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }



    findOneById(id) {
        return new Promise((resolve, reject) => {
            con.query(`select a.*, b.*,d.phuongthucthanhtoanten from donhang a, trangthai b, phuongthucthanhtoan d
            where a.iddonhang = ${id} 
            and a.idphuongthucthanhtoan = d.idphuongthucthanhtoan
            and a.donhangtrangthai = b.idtrangthai`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }


    findProductById(id) {
        return new Promise((resolve, reject) => {
            con.query(`select a.*, s.sanphamten, s.sanphamgia, s.sanphamhinhdaidien 
            from chitietdonhang a, sanpham s
            where a.idsanpham = s.idsanpham
            and a.iddonhang = ${id}`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    update(tinhTrang, maDH) {
        return new Promise((resolve, reject) => {
            con.query(`UPDATE donhang
            SET donhangtrangthai = ${tinhTrang}
            WHERE iddonhang = ${maDH};`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    // updateTT(thoanhToan, maDH) {
    //     return new Promise((resolve, reject) => {
    //         con.query(`UPDATE donhang
    //         SET tinhTrangThanhToan = ${thoanhToan}
    //         WHERE maDH = ${maDH};`, function (error, result, fields) {
    //             if (error) {
    //                 reject(error);
    //                 return;
    //             }
    //             resolve(result);
    //         });
    //     })
    // }

    // findAllByCustomerId(maKH) {
    //     return new Promise((resolve, reject) => {
    //         con.query(`select a.maDH, a.ngayDat, a.tongTien, a.maKH, a.tinhtrangthanhtoan, b.phuongthuc, c.tinhtrang, c.id as idTT
    //         from donhang a 
    //         inner join phuongthucthanhtoan b
    //         on a.phuongthucthanhtoan = b.id
    //         inner join tinhtrangdonhang c
    //         on a.tinhtrangdonhang = c.id
    //         and a.maKH = ${maKH} ORDER BY maDH DESC;`, function (error, result, fields) {
    //             if (error) {
    //                 reject(error);
    //                 return;
    //             }
    //             resolve(result);
    //         });
    //     })
    // }

    // findAllByTinhTrangId(id) {
    //     return new Promise((resolve, reject) => {
    //         con.query(`select a.*, b.phuongthuc, c.tinhtrang, d.hoten, d.diachi, d.sodienthoai
    //         from donhang a 
    //         inner join phuongthucthanhtoan b
    //         on a.phuongthucthanhtoan = b.id
    //         inner join tinhtrangdonhang c
    //         on a.tinhtrangdonhang = c.id
    //         inner join khachhang d
    //         on a.maKH = d.maKH
    //         where c.id = ${id}
    //         ORDER BY maDH DESC;`, function (error, result, fields) {
    //             if (error) {
    //                 reject(error);
    //                 return;
    //             }
    //             resolve(result);
    //         });
    //     })
    // }

    findQuantity(maSP) {
        return new Promise((resolve, reject) => {
            con.query(`select soluongcon from sanpham where idsanpham = ${maSP};`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    updateQuatity(maSP, soLuongCon, soLuong) {
        return new Promise((resolve, reject) => {
            con.query(`update sanpham set soluongcon = (soluongcon - ${soLuong}) where idsanpham = ${maSP};`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }
}

module.exports = new orderService()