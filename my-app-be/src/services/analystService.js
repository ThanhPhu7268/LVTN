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

    findTotalOrder() {
        return new Promise((resolve, reject) => {
            con.query(`SELECT COUNT(*) as totalOrder FROM donhang;`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    findTotalOrderSale() {
        return new Promise((resolve, reject) => {
            con.query(`SELECT SUM(cd.chitietdonhangsoluong) AS tongsanpham
            FROM chitietdonhang cd
            INNER JOIN donhang dh ON cd.iddonhang = dh.iddonhang
            WHERE dh.donhangtrangthai = 4;`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    findAllRevenue() {
        return new Promise((resolve, reject) => {
            con.query(`SELECT 
            months.month_year,
            COUNT(dh.iddonhang) AS sodonhang,
            IFNULL(SUM(sp.sanphamgia * cd.chitietdonhangsoluong), 0) AS revenue,
            IFNULL(SUM(sp.gianhap * cd.chitietdonhangsoluong), 0) AS expense,
            IFNULL(SUM(sp.sanphamgia * cd.chitietdonhangsoluong) - SUM(sp.gianhap * cd.chitietdonhangsoluong), 0) AS profit
        FROM 
            (
                SELECT 
                    DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL n MONTH), '%m') AS month_year
                FROM 
                    (SELECT 1 AS n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 
                     UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 
                     UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12) AS numbers
            ) AS months
        LEFT JOIN 
            donhang dh ON DATE_FORMAT(dh.donhangngaylap, '%m') = months.month_year AND dh.donhangtrangthai = 4
        LEFT JOIN 
            chitietdonhang cd ON cd.iddonhang = dh.iddonhang
        LEFT JOIN 
            sanpham sp ON cd.idsanpham = sp.idsanpham
        GROUP BY 
            months.month_year
        ORDER BY 
            months.month_year;`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    findRevenueMonth() {
        return new Promise((resolve, reject) => {
            con.query(`SELECT 
            MONTH(MAX(dh.donhangngaylap)) AS month_number,
            IFNULL(SUM(sp.sanphamgia * cd.chitietdonhangsoluong), 0) AS revenue,
            IFNULL(SUM((sp.sanphamgia - sp.gianhap) * cd.chitietdonhangsoluong), 0) AS profit
        FROM 
            (SELECT MONTH(CURDATE()) AS month_number) AS current_month
        LEFT JOIN 
            donhang dh ON MONTH(dh.donhangngaylap) = current_month.month_number
        LEFT JOIN 
            chitietdonhang cd ON cd.iddonhang = dh.iddonhang
        LEFT JOIN 
            sanpham sp ON cd.idsanpham = sp.idsanpham
        WHERE 
            dh.donhangtrangthai = 4;`, function (error, result, fields) {
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