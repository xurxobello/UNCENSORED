
const bcrypt = require ("bcrypt");
const jwt = require ("jsonwebtoken")
const {generateError} = require ("../helpers");
const {createUser, getUserByEmail} = require ("../DDBB/usersdb");
const {getUserById} = require("../DDBB/usersdb");


const newUserController = async ( req, res, next) => { //
    try{
        const {email, password} =req.body;

				// sustituir por joi
        if (!email || !password){
					throw generateError ("imprescindible mail y password",400);
        }
				const id= await createUser (email, password);
                //console.log(id);
			
        res.send ({
            status: "OK",
            message: `User created with id : ${id}`,
        });
    }catch (error){
        next (error); //lanza la peticion al siguiente middelware definido--- Al haber un8 error), lo pasa al gestor de errores en server.js

    }
};
const getUserController = async ( req, res, next) => {
    try{
        const {id} =req.params;
        const user= await getUserById (id)


        res.send ({
            status: "ok",
            data: user,
        });
    }catch (error){
        next (error); 
}
};

const loginController = async ( req, res, next) => {
    try{
        const {email,password} = req.body;
        if (!email || !password) {
            throw generateError ("Imprescindible email y password", 400);
        }

 // Recogemos de la DDBB  los datos del usuario con ese mail       
		const user = await getUserByEmail (email); 7

 // Comprobación de contraseñas  (Sino Error)
 const validPassword = await bcrypt.compare (password, user.password) // esto da true si coinciden y tienen el mismo HASH
    if (!validPassword) {
    throw generateError ( "La contraseña no coincide", 401);
    }

 // Creación del PAYLOAD del token

const payload = {id: user.id};

 // Firma del token

const token = jwt.sign(payload, process.env.SECRET,{
    expiresIn:"30d",
});

 // Envío del token

        res.send ({
            status: "ok",
            data: token,
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