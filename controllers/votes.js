const { newVote } = require('../DDBB/votesdb');
const { generateError } = require('../helpers');

const newVoteController = async (req, res, next) => {
  try {
    const { vote } = req.body;

    if (!vote) {
      throw generateError('Any vote has been genated', 400);
    }

    const id = await newVote(req.user_id);

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
