
const { getConnection } = require ("../DDBB/db");




const newVote = async ( vote,user_id, comment_id) => {
    let connection;

    try {
        connection = await getConnection ();

        const [result] = await connection.query (`
        INSERT INTO votes (user_id, vote,comment_id)
        VALUES (? ? ?)
        `, [user_id, vote, comment_id]);
        
        return result.insertVote;

        } finally {
        if (connection) connection.release ();
    }
}; 

module.exports = {
newVote,
};