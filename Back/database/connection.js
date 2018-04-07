const mysql = require('promise-mysql');
let connection = null;

function init() {
    return mysql.createConnection({
        host: process.env.MYSQL_SERVER || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'password',
        database: process.env.MYSQL_DATABASE || 'potimonDb'
    }).then(function(conn){    
        connection = conn;
    });
}

function getConnection(){
    return connection;
}

module.exports = {
    init,
    getConnection
}