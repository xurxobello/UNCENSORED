const { generateError } = require('../helpers');
const { getConnection } = require('../DDBB/db');

const deleteCommentsById = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    await connection.query(
      `
        DELETE  FROM comments WHERE id = ?
        `,
      [id]
    );

    return;
  } finally {
    if (!connection) connection.release();
  }
};

const getAllCommentsById = async (id) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `
        SELECT * FROM comments WHERE id=?
        `,
      [id]
    );

    if (result.length === 0) {
      throw generateError(`Comment con id: ${id} no existe`, 404);
    }

    return result[0];
  } finally {
    if (!connection) connection.release();
  }
};

const getAllComments = async () => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(`
        SELECT * FROM comments ORDER BY created_at DESC
        `);

    return result;
  } finally {
    if (!connection) connection.release();
  }
};

const createComment = async (userId, text, title) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
        INSERT INTO comments (user_id, text, title) VALUES (?,?,?)
        `,
      [userId, text, title]
    );

    return result.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  createComment,
  getAllComments,
  getAllCommentsById,
  deleteCommentsById,
};
