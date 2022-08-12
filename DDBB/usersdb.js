const bcrypt = require('bcrypt');
const { generateError } = require('../helpers');
const { getConnection } = require('../DDBB/db');

const getUserByEmail = async (email) => {
  let connection;

  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `SELECT * FROM users WHERE email=? 
      `,
      [email]
    );
    if (result.lenght === 0) {
      throw generateError('No hay ningún usuario con ese email', 404);
    }
    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

// Edicion del campo email

const editUserMail = async (email) => {
  let connection;
  try {
    connection = await getConnection();
    const [newEmail] = await connection.query(
      `
    UPDATE users SET email = ?;
    `,
      [email]
    );

    return newEmail;
  } finally {
    if (connection) connection.release();
  }
};

// devuelve la información pública de un usuario por su id

const getUserById = async (id) => {
  let connection;

  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `SELECT id, email, created_at FROM users WHERE id=? 
            `,
      [id]
    );
    if (result.lenght === 0) {
      throw generateError('No hay ningún usuario con ese ID', 404);
    }
    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

//CREAR USUARIO. Requiere de 4 pasos.

//1. Crear un usuario en la DDBB y devuelve su ID
const createUser = async (email, password, name) => {
  // recibe un mail y una password
  let connection; // crea una conexion

  try {
    connection = await getConnection(); // consigue una conexion real a DDBB
    //2. Comprobar que no exista otro usuario con ese mail
    const [user] = await connection.query(
      `
    SELECT id FROM users WHERE email = ?
    `,
      [email]
    );

    if (user.lenght > 0) {
      throw generateError('Ya existe un usuario en la DDBB con ese mail', 409);
    }

    //3. Encriptar password
    const passwordHash = await bcrypt.hash(password, 8);

    // 4. Crear el usuario
    const [newUser] = await connection.query(
      `
    INSERT INTO users (email, password, name) VALUES (?,?,?)
`,
      [email, passwordHash, name]
    );

    // 5. Devolver un id
    return newUser.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  createUser,
  editUserMail,
  getUserById,
  getUserByEmail,
};
