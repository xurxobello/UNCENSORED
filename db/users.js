

const bcrypt = require('bcrypt'); // Instalamos el módulo para encriptar la password
const { generateError } = require('../helpers');
const { getConnection } = require('/db');



const getUserByEmail = async (email) => {

    let connection; // Variable vacía para guardar la conexión

    try {

        connection = await getConnection(); // Esperando a tener conexión 

        const [result] = await connection.query(

            `SELECT * FROM users WHERE email = ?`, [email]); 
        
        if (result.lenght === 0) { 
                
            throw generateError('There`s no user with this e-mail', 404);
        } 

            return result[0];

            } 
        
     finally {

        if (connection) connection.release(); // Soltamos la conexión
        
    }
}



const getUserById = async (id) => { // Función que devuelve la información pública de un usuario por su id.

    let connection; 

    try {

        connection = await getConnection(); // Esperando a tener conexión 

        const [result] = await connection.query(

            `SELECT id, email, created_at FROM users WHERE id= ?`, [id]); 
        if (result.lenght === 0) { 
                
            throw generateError('There`s no user with this id', 404);
        } // Lanzamos mensaje de error 

            return result[0];

            } 
        
     finally {

        if (connection) connection.release(); // Soltamos la conexión
        
    }
}



const createUser = async (email, password) => { // Función para crear un nuevo usuario en la BBDD

    let connection; 

    try {
        
        connection = await getConnection(); // Esperando a tener conexión 

        const [user] = await connection.query(`SELECT id FROM users WHERE email = ?`, [email]);  // Comprobamos que no exista otro usuario con ese email 

        if (user.lenght > 0) { 

            throw generateError('There`s already an user in DB with that email', 409); // Lanzamos mensaje de error 

        }

        const passwordHash = await bcrypt.hash(password, 8); // Encriptamos la password

        const [newUser] = await connection.query(`INSERT INTO users (email, password) VALUES(?, ?)`, [email, passwordHash]); // Creamos el usuario 

        return newUser.insertId 

    } finally {

        if (connection) connection.release(); // Soltamos la conexión

    }
}

module.exports = { // Exportamos las funciones creadas 
    createUser,
    getUserById,
    getUserByEmail
};