const con = require('../config/connectDB')

class cartService {

    findAllById(id) {
        return new Promise((resolve, reject) => {
            con.query(`select b.chitietgiohangsoluong as quantity
            ,a.idgiohang as idcart, b.idsanpham as idproduct, c.sanphamten as productName,
            c.sanphamhinhdaidien as productImg
            ,c.sanphamgia as price  from giohang a
            inner join chitietgiohang b
            on a.idgiohang = b.idgiohang
            inner join sanpham c 
            on c.idsanpham = b.idsanpham
            and idkhachhang = ${id}`, function (error, result, fields) {
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

    }
    delete(id) {
        return new Promise((resolve, reject) => {
            con.query(`delete from chitietgiohang where idgiohang = ${id}`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }
}
module.exports = new cartService()