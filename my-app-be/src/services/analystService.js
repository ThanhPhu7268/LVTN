const con = require('../config/connectDB')

class analystService {

    countOrdersIn7Days() {
        return new Promise((resolve, reject) => {
            con.query(`SELECT count(maDH) as tongDon FROM donhang 
            where ngayDat >= DATE_SUB(NOW(), INTERVAL 7 DAY)`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    ordersIn7Days() {
        return new Promise((resolve, reject) => {
            con.query(`SELECT *
            FROM donhang
            WHERE donhangngaylap >= DATE_SUB(CURDATE(), INTERVAL 7 DAY);`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    countOrdersPaidIn7Days() {
        return new Promise((resolve, reject) => {
            con.query(`SELECT count(maDH) as tongDon FROM donhang 
            where ngayDat >= DATE_SUB(NOW(), INTERVAL 7 DAY) and tinhTrangThanhToan = 1;`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }


    sumOrderInDay(day) {
        return new Promise((resolve, reject) => {
            con.query(`SELECT DATE(ngayDat) as ngay, SUM(tongTien) AS tongtien
            FROM donhang
            WHERE DATE(ngayDat) = '${day}' and tinhTrangThanhToan = 1;`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

}

module.exports = new analystService()