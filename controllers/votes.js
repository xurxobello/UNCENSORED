const { newVote } = require("../DDBB/votesdb");
const { generateError } = require("../helpers");


const newVoteController = async (req, res, next) => {
    try{
        const {vote} = req.body;

        if( !vote ){
        throw  generateError (" No se ha generado ningún voto", 400);
        }

const id = await newVote (req.user_id);

        res.send ({
            status: "ok",
            message: `Vote con id: ${id} creado correctamente`,
        });
    }catch (error){
        next (error); 
}

};

module.exports =  {
newVoteController,
}