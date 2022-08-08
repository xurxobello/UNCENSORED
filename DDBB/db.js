const mysql = require('mysql2/promise');
//desestructuramos las variables de entorno
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;
//creamos variable pool de conexiones para tenerla disponible
let pool;

//funcion async.. si el pool no exite , lo creamos con las caracteristicas que precisamos.

const getConnection = async () => {
  if (!pool) {
    pool = mysql.createPool({
      connectionLimit: 10,
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
      timezone: 'Z',
    });
  }
  // y si el pool ya está creado- dame uno.
  return await pool.getConnection();
};
// exportamos la funcion getConnection

module.exports = {
  getConnection,
};
