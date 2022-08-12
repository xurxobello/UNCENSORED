const { newVote } = require('../DDBB/votesdb');
const { generateError } = require('../helpers');

const newVoteController = async (req, res, next) => {
  try {
    const { vote, comment_id } = req.body;

    if (!vote || !comment_id) {
      throw generateError(
        ' vote and comment_id are required',
        400
      );
    }

    const id = await newVote(req.userId, comment_id, vote);

    res.send({
      status: 'ok',
      message: `Vote with id: ${id} succesfully created`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newVoteController,
};