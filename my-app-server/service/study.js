const con = require('../configs/db')
class Study {
    getQuestionByStudyId(id) {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM cauhoi where idChuDe=${id}`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    getAnswerByQuestionId(id) {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM dapan where idCauHoi =${id}`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }
    getCountQuestion(id) {
        return new Promise((resolve, reject) => {
            con.query(`SELECT count(*) as soCauHoi FROM nienluannganh.cauhoi where idChude =${id}`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }
}

module.exports = new Study()