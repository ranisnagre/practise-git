const mysql = require('mysql');

let connection = mysql.createConnection({
    host: '167.99.94.158',
    user: 'mspuser',
    password: '1234qwer',
    database: 'test'
});

connection.connect(function (err) {
    if (err) {
        console.log('error connecting' + err.stack);
        return;
    } else {
        console.log('connected as id' + connection.threadId);
    }
});

module.exports = connection;