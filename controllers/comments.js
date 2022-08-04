const getCommentController = async (req, res, next) => {
    try{
        res.send ({
            status: "error",
            message: "Not implemented"
        });
    }catch (error){
        next (error); //lanza la peticion al siguiente middelware definido--- Al haber un8 error), lo pasa al gestor de errores del archivo server.js
}
};
const newCommentController = async (req, res, next) => {
    try{
        res.send ({
            status: "error",
            message: "Not implemented"
        });
    }catch (error){
        next (error); 
}
};
const getSingleCommentController = async (req, res, next) => {
    try{
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
        res.send ({
            status: "error",
            message: "Not implemented"
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