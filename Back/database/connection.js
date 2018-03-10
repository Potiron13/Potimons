const mysql = require('promise-mysql');
let connection = null;

function init() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'potimonDb'
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