const { getConnection } = require('../DDBB/db');
const { generateError } = require('../helpers');

const newVote = async (user_id, comment_id, vote) => {
  let connection;

  try {
    connection = await getConnection();
    // imprescindible comprobar que el usuario no haya votado ya ese comentario.
    const [formervote] = await connection.query(
      `
      SELECT id FROM votes WHERE user_id = ? AND comment_id = ?
      `,
      [user_id, comment_id]
    );

    if (formervote.length > 0) {
      throw generateError(
        `el usuario ${user_id} ya ha votado el comentario ${comment_id}`,
        409
      );
    }

    const [result] = await connection.query(
      `
        INSERT INTO votes (user_id, vote,comment_id)
        VALUES (?, ?, ?)
        `,
      [user_id, vote, comment_id]
    );

    return result.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  newVote,
};