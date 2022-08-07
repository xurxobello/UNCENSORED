// Archivo para crear la BBDD

require('dotenv').config(); // Lee .env

const { getConnection } = require('./db');

async function main() { // Función para que el archivo se ejecute
    let connection; // Variable vacía donde se guardará la conexión
    try {
        connection = await getConnection();

        console.log('Deleting tables'); 

        // Borramos tablas en el caso de que las haya
        
        await connection.query('DROP TABLES IF EXISTS votes') 

        await connection.query('DROP TABLE IF EXISTS opinions') 

        await connection.query('DROP TABLE IF EXISTS users') 

        

        console.log('Generating tables for users, opinions and votes');

        await connection.query(`CREATE TABLE users(
                                    id INTEGER PRIMARY KEY AUTO_INCREMENT,
                                    email VARCHAR(100) UNIQUE NOT NULL,
                                    password VARCHAR(100) NOT NULL,
                                    name VARCHAR(200) NOT NULL,
                                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                                    
        );
        
        `);

        await connection.query(`CREATE TABLE opinions(
                                    id INTEGER PRIMARY KEY AUTO_INCREMENT,
                                    user_id INTEGER NOT NULL,
                                    text VARCHAR(300) NOT NULL,
                                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                                    FOREIGN KEY (user_id) REFERENCES users(id)
        );
        
        `);

        /*await connection.query(`CREATE TABLE votes(
                                    id INTEGER PRIMARY KEY AUTO_INCREMENT,
                                    user_id INTEGER NOT NULL,
                                    votes_affirmative CHAR(2),
                                    votes_negative CHAR(2)
                                    FOREIGN KEY (text_id) REFERENCES opinions(id)
        );

        `);*/

    } catch (error) {
        console.error(error);
    } finally {
        if (connection) connection.release(); // Liberamos conexión
        process.exit();
    }
}

main();