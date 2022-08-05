const { getAllComments, getAllCommentsById, deleteCommentsById } = require("../DDBB/commentsdb");
const { createComment} = require ("../DDBB/db")
const { generateError } = require("../helpers");

const getCommentController = async (req, res, next) => {
    try{
        const comments = await getAllComments ();
        res.send ({
            status: "ok",
            data: comments,
        });
    }catch (error){
        next (error); //lanza la peticion al siguiente middelware definido--- Al haber un8 error), lo pasa al gestor de errores del archivo server.js
}
};
const newCommentController = async (req, res, next) => {
    try{
        const {text} = req.body;

        if( !text ){
        throw  generateError (" No hay texto que mostrar", 400);
        }

const id = await createComment (req.userId);

        res.send ({
            status: "ok",
            message: `Comment con id: ${id} creado correctamente`,
        });
    }catch (error){
        next (error); 
}
};
const getSingleCommentController = async (req, res, next) => {
    try{
        const {id} = req.params;
        const comment = await getAllCommentsById (id)
        console.log(comment);
        res.send ({
            status: "error",
            message: "Not implemented"
        });
    }catch (error){
        next (error); 
}
};

const deleteCommentController = async (req, res, next) => {
    try{
    const {id} = req.params;

 // Conseguir info del comment a borrar
    const comment = await getAllCommentsById (id)
    console.log(comment);

// Comprobar que el user del token es el mismo que creó el comment

    if (req.userId !== comment.user_id) {
        throw generateError ("Este comment no te pertenece, no lo puedes borrar", 401);

    }

//Borrar el comment

await deleteCommentsById (id);
    
        res.send ({
            status: "Ok",
            message: `Comment con id: ${id}  ha sido borrado`,
        });
    }catch (error){
        next (error); 
}
};

module.exports =  {
    getCommentController,
    newCommentController,
    getSingleCommentController,
    deleteCommentController,
}