const connection = require('../connection.js');

function insertUser(data) {
    var con = connection.getConnection();
    var sql = "INSERT INTO users (username, email, password) " + 
               "VALUES ('" + data.userName + "', '" + data.email + "', '" + data.password + "');";               
                                                         
    return con.query(sql);
}

function selectUser(data) {
    var con = connection.getConnection();
    var sql =  "SELECT user_id FROM potimondb.users where username = '" + data.userName +
                "' and password = '" + data.password + "';";               
                                                         
    return con.query(sql);
}

module.exports = {
    insertUser,
    selectUser,
}