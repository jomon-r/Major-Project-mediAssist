const mysql = require('mysql')
const db = mysql.createConnection({
    host: "sql12.freemysqlhosting.net",
    user: "sql12618819",
    password: "MwD1V663VV",
    database: "sql12618819",
    port: 3306,
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ',err);
        return;
    }
    console.log('Connected to MySQL database');
});

module.exports = db;