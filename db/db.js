// Este archivo nos permite conectarnos a la BBDD.

const mysql = require('mysql2/promise');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env; // Datos indicados en .env

let pool;

const getConnection = async () => { //Función para conectar con la BBDD
    
    if (!pool) { 

        pool = mysql.createPool({ 

            connectionLimit: 10,
            host: MYSQL_HOST,
            user: MYSQL_USER,
            password: MYSQL_PASSWORD,
            database: MYSQL_DATABASE,
            timezone: 'Z', 
            
        })}

    return await pool.getConnection(); };

module.exports = { 
    getConnection,}