const jwt = require ("jsonwebtoken");
const { generateError } = require("../helpers");

const authUser = (req, res, next) => {
    try {
        const {authorization} = req.headers;
        if( !authorization) {
            throw generateError ("Falta cabecera de autorización", 404);
        }
// Comprobación de token (si no es correcto- Error)
let token;
try{
    token = jwt.verify ( authorization, process.env.SECRET);

} catch {
    throw generateError ("Token incorrecto", 404);
}
 console.log(token);


// Info del token en request para usarla en el controlador
req.userId = token.id;


//Saltamos al controlador

next ();

    }catch (error) {
    next (error);
    }
};

module.exports = {
    authUser,
};