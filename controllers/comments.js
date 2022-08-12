const {
  createComment,
  getAllComments,
  getAllCommentsById,
  deleteCommentsById,
} = require('../DDBB/commentsdb');
const { generateError } = require('../helpers');

const getCommentController = async (req, res, next) => {
  try {
    const comments = await getAllComments();
    res.send({
      status: 'ok',
      data: comments,
    });
  } catch (error) {
    next(error); //lanza la peticion al siguiente middelware definido--- Al haber un error, lo pasa al gestor de errores del archivo server.js
  }
};
const newCommentController = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text) {
      throw generateError("'text' is a required field", 400);
    }
    console.log(req.userId)
    const id = await createComment(req.userId, req.body.text, req.body.title);

    res.send({
      status: 'ok',
      message: `Comment with id: ${id} succesfully created`,
    });
  } catch (error) {
    next(error);
  }
};
const getSingleCommentController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await getAllCommentsById(id);
    console.log(comment);
    res.send({
      status: 'ok',
      message: comment,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCommentController = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Conseguir info del comment a borrar
    const comment = await getAllCommentsById(id);
    console.log(comment);

    // Comprobar que el user del token es el mismo que creó el comment

    if (req.userId !== comment.user_id) {
      throw generateError(
        'Can not delete comment. Check your user.',
        401
      );
    }

    //Borrar el comment

    await deleteCommentsById(id);

    res.send({
      status: 'Ok',
      message: `Comment with id: ${id}  succesfully deleted`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { // exportación a server.js
  getCommentController,
  newCommentController,
  getSingleCommentController,
  deleteCommentController,
};
