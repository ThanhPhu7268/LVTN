const con = require('../config/connectDB')

class commentService {

    findCommentByProductID(idsanpham) {
        return new Promise((resolve, reject) => {
            con.query(`select danhgia.sao, danhgia.noidung, danhgia.ngaydanhgia, khachhang.khachhangten from danhgia 
            join taikhoan on danhgia.idtaikhoan = taikhoan.idtaikhoan
            join khachhang on khachhang.idkhachhang = taikhoan.idkhachhang
            where danhgia.idsanpham = ${idsanpham}`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    create(idSP, idTK, sao, noiDung) {
        return new Promise((resolve, reject) => {
            con.query(`insert into danhgia (idsanpham, idtaikhoan, sao, noidung, ngaydanhgia) 
            values(${idSP}, ${idTK}, ${sao}, '${noiDung}', Now());`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    // delete(id) {
    //     return new Promise((resolve, reject) => {
    //         con.query(`delete from chitietgiohang where idgiohang = ${id}`, function (error, result, fields) {
    //             if (error) {
    //                 reject(error);
    //                 return;
    //             }
    //             resolve(result);
    //         });
    //     })
    // }
}

module.exports = new commentService()