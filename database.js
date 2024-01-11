import mysql from "mysql2/promise"; 

// root@127.0.0.1
const db_conn = mysql.createPool( {
    host: 'localhost',
    user: 'root',
    password: 'MyNewPass5!',
    database: 'mobile_hour_db'
}); 

export default db_conn; 
