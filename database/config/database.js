import mysql from "mysql"

const db = mysql.createConnection({
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: 'root',
    database: 'traineedb'
});

export default db;