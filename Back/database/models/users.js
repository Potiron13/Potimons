const connection = require('../connection.js');

function insertUser(data) {
    var con = connection.getConnection();
    var user = { username: data.userName, email: data.email, password: data.password }
    return con.query('INSERT INTO users SET ?', user);
}

function selectUser(data) {
    var con = connection.getConnection();
    var sql = "SELECT user_id FROM users where username = " + con.escape(data.userName) +
        " and password = " + con.escape(data.password) + ";";

    return con.query(sql);
}

module.exports = {
    insertUser,
    selectUser,
}