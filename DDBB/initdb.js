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
//y si hay alguna creada, me borras primero el comentario y luego el usuario, al revés crearía conlicto pq hemos metido en la tabla  comments el user_id como FOREING KEY.
await connection.query ("DROP TABLE IF EXISTS comments");
await connection.query ("DROP TABLE IF EXISTS users");

console.log(" Generating Tables");

await connection.query (`
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        password VARCHAR (100) NOT NULL, 
        email  VARCHAR (100) UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    `);

await connection.query (`
    CREATE TABLE comments (
        id  INTEGER PRIMARY KEY AUTO_INCREMENT,
        user_id INTEGER NOT NULL,
        text VARCHAR (500) NOT NULL,
        image VARCHAR (100),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
    `);

await connection.query (`
    CREATE TABLE likes {
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        user_id INTEGER,
        comment_id INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id)  REFERENCES
    }




`)



    } catch (error) {
    console.error(error);

    } finally {
        if (connection) connection.release (); //Si hay una conexion,se libera.
        process.exit ();

    }
}

main();
