const con = require('../config/connectDB')

class accountService {

    findAll() {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM taikhoan a, khachhang b where a.idkhachhang =b.idkhachhang;  
            `, function (error, result, fields) {
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

    findOneCustommer(idkhachhang) {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM khachhang where idkhachhang = ${idkhachhang};`, function (error, result, fields) {
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