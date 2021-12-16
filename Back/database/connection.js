const mysql = require('promise-mysql');
let connection = null;

function init() {
    return mysql.createConnection({
        host: process.env.MYSQL_SERVER || 'mysql-potiron.alwaysdata.net',
        user: process.env.MYSQL_USER || 'potiron_admin',
        password: process.env.MYSQL_PASSWORD || 'canardmouton',
        database: process.env.MYSQL_DATABASE || 'potiron_db'
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