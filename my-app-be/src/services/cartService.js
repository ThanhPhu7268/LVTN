const con = require('../config/connectDB')

class cartService {

    findAll() {
        return new Promise((resolve, reject) => {
            con.query(`select c.*, s.sanphamten, s.sanphamgia, s.sanphamhinhdaidien, g.giohangsoluong, g.giohangtonggia, k.idkhachhang from chitietgiohang c
            inner join sanpham s on c.idsanpham = s.idsanpham
            inner join giohang g on g.idgiohang = c.idgiohang
            inner join khachhang k on g.idkhachhang = k.idkhachhang;`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    createCart(quantityCart, totalCart, idkhachhang) {
        return new Promise((resolve, reject) => {
            con.query(`INSERT INTO giohang(giohangsoluong, giohangtonggia,idkhachhang) VALUES (${quantityCart},${totalCart},${idkhachhang});`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    createCartDetail(quantity, idgiohang, idsanpham) {
        return new Promise((resolve, reject) => {
            con.query(`INSERT INTO chitietgiohang(chitietgiohangsoluong, idgiohang,idsanpham) VALUES (${quantity},${idgiohang},${idsanpham});`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    findIdCartByIdUser(iduser) {
        return new Promise((resolve, reject) => {
            con.query(`Select g.idgiohang from giohang g where g.idkhachhang = ${iduser};`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
        // update(newCategoryName, id) {
        //     return new Promise((resolve, reject) => {
        //         con.query(`UPDATE loaisanpham
        //         SET tenLoai = '${newCategoryName}'
        //         WHERE id = ${id};`, function (error, result, fields) {
        //             if (error) {
        //                 reject(error);
        //                 return;
        //             }
        //             resolve(result);
        //         });
        //     })
        // }

        // delete(id) {
        //     return new Promise((resolve, reject) => {
        //         con.query(`delete from loaisanpham where id = ${id}`, function (error, result, fields) {
        //             if (error) {
        //                 reject(error);
        //                 return;
        //             }
        //             resolve(result);
        //         });
        //     })
        // }


    }
}
module.exports = new cartService()