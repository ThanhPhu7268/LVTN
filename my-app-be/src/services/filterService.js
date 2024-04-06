const con = require('../config/connectDB')

class filterService {
    //tìm theo thương hiệu
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

    findOneById(name) {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM sanpham where idsanpham = ${name}`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    findProductByBrand(thuonghieu) {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM sanpham where sanphamgioitinh = 'Nam'
            and idthuonghieu = ${thuonghieu}`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }
    //tìm theo kiểu mặt đồng hồ
    findType() {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM  kieumat`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }
    findProductByType(kieumat) {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM sanpham where sanphamgioitinh = 'Nam'
            and idkieumat = ${kieumat}`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }
    //Tìm theo kích thước
    findSize() {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM  kichthuoc`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }
    findProductBySize(kichthuoc) {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM sanpham where sanphamgioitinh = 'Nam'
            and idkichthuoc = ${kichthuoc}`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }
    //Tìm theo loại máy
    findMachine() {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM  loaimay`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    findProductByMachine(loaimay) {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM sanpham where sanphamgioitinh = 'Nam'
            and idloaimay = ${loaimay}`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    //tìm theo chất liệu
    findMaterial() {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM  chatlieu`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    findProductByMaterial(chatlieu) {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM sanpham where sanphamgioitinh = 'Nam'
            and idchatlieu = ${chatlieu}`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }
    //Tìm theo giới tính
    findProductBySex(gioitinh) {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM sanpham where sanphamgioitinh = 'Nam'`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    findProductByWoman() {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM sanpham where sanphamgioitinh = 'Nữ'`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }
}

module.exports = new filterService()