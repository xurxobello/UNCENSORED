require ("dotenv").config (); //leera el archivo .env desde donde lo ejecutemos

//console.log(process.env);


const { getConnection } = require ('./db');



/* Creamos una funcion main que:
-cree una variable connection que guarde la referencia a la conexión, que intente conectarse: si es ok se libera la conexion y salimos del proceso, sino nos lanza un error
*/

async function main () {
    //console.log('main');
    let connection;
    
    try { // creamos dentro del try las tablas  de la ddbb
    connection = await getConnection ();    //llama al getConnection del db.js
    //Antes de crear tablas, nos aseguramos de que no haya otra creada.

    console.log( "Deleting existing Tables");
//y si hay alguna creada, me borras primero los votos, luego el comentario y luego el usuario, al revés crearía conlicto pq hemos metido en la tabla  comments el user_id como FOREING KEY.
await connection.query ("DROP TABLE IF EXISTS votes");
await connection.query ("DROP TABLE IF EXISTS comments");
await connection.query ("DROP TABLE IF EXISTS users");


console.log(" Generating Tables");

await connection.query (`
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR (20),
        password VARCHAR (100) NOT NULL, 
        email  VARCHAR (100) UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    `);

await connection.query (`
    CREATE TABLE comments (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        user_id INTEGER NOT NULL,
        title VARCHAR (250) NOT NULL,
        text VARCHAR (500) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    `);
    await connection.query(`
    CREATE TABLE  votes (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        vote BOOLEAN NOT NULL,
        user_id INTEGER NOT NULL,
        comment_id INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (comment_id) REFERENCES comments(id)
    )
    `)


    } catch (error) {
    console.error(error);

    } finally {
        if (connection) connection.release (); //Si hay una conexion,se libera.
        process.exit ();

    }
}

main();
