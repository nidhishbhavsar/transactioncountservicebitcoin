var mysql = require('mysql');

var connectionPool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bitcoinexampledb',
    debug: false,
    acquireTimeout: 30000
});

module.exports = connectionPool;