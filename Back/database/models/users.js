const connection = require('../connection.js');

function insertUser(data) {
    var con = connection.getConnection();
    var user = { username: data.userName, email: data.email, password: data.password, guid_token: data.guidToken, active: 0 }
    return con.query('INSERT INTO users SET ?', user);
}

function selectUser(data) {
    var con = connection.getConnection();
    var sql = "SELECT user_id, username FROM users where username = " + con.escape(data.userName) +
        " and password = " + con.escape(data.password) + " and active = 1" + ";";

    return con.query(sql);
}

function activateAccount(data) {
    var con = connection.getConnection();
    var sql = "UPDATE users SET active = 1 where guid_token = " + con.escape(data.guidToken);        

    return con.query(sql);
}

function updateSessionGuid(data) {
    var con = connection.getConnection();
    var sql = "UPDATE users SET session_guid = " + con.escape(data.sessionGuid) + " where user_id = " + con.escape(data.userId);               

    return con.query(sql);
}

function selectUserWithSessionGuid(data) {
    var con = connection.getConnection();
    var sql = "SELECT session_guid, username, password FROM users where session_guid = " + con.escape(data.sessionGuid);
    console.log(sql);
    

    return con.query(sql);
}

module.exports = {
    insertUser,
    selectUser,
    activateAccount,
    updateSessionGuid,
    selectUserWithSessionGuid,
}