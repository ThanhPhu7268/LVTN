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
    //render thương hiệu ra 
    findBrand() {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM thuonghieu;  
            `, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })

    }
    //tìm theo thương hiệu
    findProductByBrand(thuonghieu) {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM sanpham where idthuonghieu = ${thuonghieu}`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }
    //tìm theo chất liệu
    findProductByMaterial(chatlieu) {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM sanpham where idchatlieu = ${chatlieu}`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }
    //tìm theo kiểu mặt đồng hồ
    findProductByType(kieumat) {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM sanpham where idkieumat = ${kieumat}`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }
    //Tìm theo kích thước
    findProductBySize(kichthuoc) {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM sanpham where idkichthuoc = ${kichthuoc}`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }
    //Tìm theo loại máy
    findProductByMachine(loaimay) {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM sanpham where idloaimay = ${loaimay}`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    create(tenSP, giaBan, moTa, soLuongCon, maLoai, anhdaidien) {
        return new Promise((resolve, reject) => {
            con.query(`INSERT INTO sanpham(tenSP, giaBan, moTa, soLuongCon, maLoai, anhdaidien)
            VALUES ('${tenSP}', '${giaBan}', '${moTa}', ${soLuongCon}, ${maLoai}, '${anhdaidien}');`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    // update() {
    //     return new Promise((resolve, reject) => {
    //         con.query(`UPDATE table_name
    //         SET column1 = value1, column2 = value2, ...
    //         WHERE condition;`, function (error, result, fields) {
    //             if (error) {
    //                 reject(error);
    //                 return;
    //             }
    //             resolve(result);
    //         });
    //     })
    // }

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

    findOneById(id) {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM sanpham where idsanpham = ${id}`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }




}

module.exports = new productService()