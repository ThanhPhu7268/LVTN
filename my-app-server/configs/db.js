const mysql = require('mysql2')

const con = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "phunguyen7268",
  database: "nienluannganh"
});

con.getConnection((err, connection) => {
  if (err) {
    console.error('Lỗi kết nối đến cơ sở dữ liệu:', err);
    return;
  }

  console.log('Kết nối thành công đến cơ sở dữ liệu');

  // Thực hiện các truy vấn hoặc thao tác cơ sở dữ liệu tại đây

  // Khi bạn hoàn thành, hãy giải phóng kết nối
  connection.release();
});

// Xử lý lỗi kết nối
con.on('error', err => {
  console.error('Lỗi kết nối đến cơ sở dữ liệu:', err);
});

module.exports = con




