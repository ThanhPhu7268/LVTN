const con = require('../configs/db')

class Comment {
    findAllByIdBlog(id) {
        return new Promise((resolve, reject) => {
            con.query(`select * from danhgia where idBlog =${id} ORDER BY created_at DESC`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    insertComment(userId, idBlog, content) {
        return new Promise((resolve, reject) => {
            con.query(`insert into danhgia(taikhoan,idBlog,noiDung) values('${userId}',${idBlog},'${content}');`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }
}

module.exports = new Comment()