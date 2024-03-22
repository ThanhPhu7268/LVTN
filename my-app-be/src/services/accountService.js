const con = require('../config/connectDB')

class accountService {

    findAll() {
        return new Promise((resolve, reject) => {
            con.query(`SELECT a.*, b.maTK,  b.matkhau, b.vaitro
            FROM khachhang a
            left JOIN taikhoan b
            ON a.maKH = b.maKH;`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    createCustomer(hoten, email, sodienthoai) {
        return new Promise((resolve, reject) => {
            con.query(`INSERT INTO khachhang(khachhangten, khachhangemail, khachhangsdt) VALUES ('${hoten}','${email}','${sodienthoai}');
            `, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    findOneAccount(taikhoan) {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM taikhoan where taikhoanten = '${taikhoan}'`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }
    findOneByPhone(sdt) {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM khachhang where khachhangsdt = '${sdt}'`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    createAccount(taikhoan, matkhau, idkhachhang) {
        return new Promise((resolve, reject) => {
            con.query(`INSERT INTO taikhoan(taikhoanten, matkhau, taikhoanvaitro, idkhachhang) VALUES ('${taikhoan}','${matkhau}',2,${idkhachhang});`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }



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

module.exports = new accountService()