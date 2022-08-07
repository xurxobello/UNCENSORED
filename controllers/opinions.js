// Creamos las funciones controladoras de las rutas de opiniones

const { getOpinionController, getSingleOpinionController } = require('../db/initDB')

const { newOpinionController} = require ('../db/initDB')
const { generateError } = require('../helpers');




const newOpinionController = async (req, res, next) => { 

    try {

        const { text } = req.body;

        if (!text || text.length > 0) {

            throw generateError ('Text must be greater than 0 characters', 400)
        };
        
        res.send({

            status: 'error',
            message: 'Not implemented',

        });

    } catch (error) {

        next(error);

    }
    
};




const getSingleOpinionController = async (req, res, next) => {

    try {
        
        const { id } = req.params;
        const opinion = await getOpinionById(id);

        res.send({

            status: 'ok',
            data: opinion,

        });

    } catch (error) {

        next(error);

    }
    
};
    

const getOpinionController = async (req, res, next) => {

    try {
    
        const opinion = await get
        
        res.send({

            status: 'error',
            message: 'Not implemented',

        });

    } catch (error) {

        next(error);

    }
    
};




module.exports = { // Exportamos la funciones controladoras declaradas arriba

    newOpinionController,
    getOpinionController,
    getSingleOpinionController,    
     

};