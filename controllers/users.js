const {generateError} = require ("../helpers");
const {createUser} = require ("../DDBB/users");


const newUserController = async ( req, res, next) => { //
    try{
        const {email, password} =req.body;

				// sustituir por joi
        if (!email || !password){
					throw generateError ("imprescindible mail y password",400);
        }
				const id= await createUser (email, password);
			
        res.send ({
            status: "OK",
            message: "User created with id : ${id}",
        });
    }catch (error){
        next (error); //lanza la peticion al siguiente middelware definido--- Al haber un8 error), lo pasa al gestor de errores en server.js

    }
};
const getUserController = async ( req, res, next) => {
    try{
        res.send ({
            status: "error",
            message: "Not implemented"
        });
    }catch (error){
        next (error); 
}
};

const loginController = async ( req, res, next) => {
    try{
			const {id} = req.params;
			console.log(id);
        res.send ({
            status: "error",
            message: "Not implemented"
        });
    }catch (error){
        next (error); 
}
};

module.exports = { // cogemos este objeto  y lo copiamos en server.js que es donde lo vamos a importar.
    newUserController,
    getUserController,
    loginController
};