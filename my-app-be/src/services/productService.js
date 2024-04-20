const con = require('../config/connectDB')

class productService {
    //render tất cả sản phẩm
    findALl() {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM sanpham;  
            `, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    findProductByBrand() {
        return new Promise((resolve, reject) => {
            con.query(`select * from sanpham s, thuonghieu t where s.idthuonghieu = t.idthuonghieu order by idsanpham DESC;  
            `, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    findProductHome() {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM sanpham WHERE sanphamgioitinh = 'Nam' ORDER BY RAND() LIMIT 8;
            `, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    findProductHomeWm() {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM sanpham WHERE sanphamgioitinh = 'Nữ' ORDER BY RAND() LIMIT 8;`,
                function (error, result, fields) {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(result);
                });
        })
    }


    findProductHomeCp() {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM sanpham WHERE sanphamgioitinh = 'Cặp Đôi' ORDER BY RAND() LIMIT 8;  
            `, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    findOneById(sanpham) {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM sanpham where sanpham.idsanpham = ${sanpham}`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    create(tenSP, gia, moTa, gioiTinh, idChatLieu, idKieuMat, idThuongHieu, idKichThuoc, idLoaiMay, anhDaiDien) {
        return new Promise((resolve, reject) => {
            con.query(`INSERT INTO sanpham(sanphamten, sanphamgia, sanphammota, sanphamgioitinh, idchatlieu, idkieumat, idthuonghieu, idkichthuoc, idloaimay, sanphamhinhdaidien)
            VALUES ('${tenSP}', '${gia}', '${moTa}', '${gioiTinh}', ${idChatLieu}, ${idKieuMat}, ${idThuongHieu}, ${idKichThuoc}, ${idLoaiMay}, '${anhDaiDien}');`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            con.query(`delete from sanpham where idsanpham = ${id}`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    update(ten, gia, moTa, gioiTinh, chatLieu, kieuMat, thuongHieu, kichThuoc, loaiMay, idSP) {
        return new Promise((resolve, reject) => {
            con.query(`UPDATE sanpham
            SET 
                sanphamten = '${ten}',
                sanphamgia = ${gia},
                sanphammota = '${moTa}',
                sanphamgioitinh = '${gioiTinh}',
                idchatlieu = ${chatLieu},
                idkieumat = ${kieuMat},
                idthuonghieu = ${thuongHieu},
                idkichthuoc = ${kichThuoc},
                idloaimay = ${loaiMay}
            WHERE idsanpham = ${idSP};`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    // findAllByCategoryId(id) {
    //     return new Promise((resolve, reject) => {
    //         con.query(`SELECT * 
    //         FROM sanpham a, loaisanpham b
    //         where a.maLoai = b.id
    //         and a.maLoai = ${id}`, function (error, result, fields) {
    //             if (error) {
    //                 reject(error);
    //                 return;
    //             }
    //             resolve(result);
    //         });
    //     })
    // }





}

module.exports = new productService()