const { generateError } = require("../helpers");
const { getConnection } = require ("../DDBB/db");

async function newVote(req, res, next) {
    let connection;
//Situaciones posibles
    try {
//  1. Que no se reciba nigún voto- 400
    const { vote } = req.body;
    if (vote === undefined) {
        throw generateError('No se está recibiendo el voto', 400);
    }
//2. El comentario no tiene identificador-404    
    const { id } = req.params;  
    if (!id) {
        throw generateError('No se ha localizado el identificador del comentario',400);
    }
    connection = await getConnection();
    const queryResult = await connection.query(
        `
                SELECT id
                FROM comments
                WHERE id=?
            `,
        [id]
    );
//3. Comprobación de id en BBDD-400
    const [result] = queryResult;
    if (result.length === 0) {
        throw generateError('no hay ningun comentario con ese id', 400);
    }
    
//4. Voto ya registrado-409    
    const existVote = await connection.query(
        `
                SELECT id
                FROM votes
                WHERE comment_id=? AND user_id=?
            `,
        [id, req.userId]
    );
    
    const [resultVote] = existVote;
    if (resultVote.length > 0) {
        throw generateError(
        `el usuario ${req.userId} ya ha votado al comentario ${id}`,
        409
        );
    }

    await connection.query(
        `
        INSERT INTO votes(vote, user_id, comment_id)
        VALUES(?, ?, ?);
            `,
        [vote, req.userId, id]
    );
//5. Voto correcto
    res.send({
        status: 'ok',
        message: `El usuario ${req.userId} ha votado correctamente`,
    });
    } catch (error) {
    next(error);
    } finally {
    if (connection) {
        connection.release();
    }
    }
}

module.exports = {
    newVote,
}
