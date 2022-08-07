// Creamos funciones par controlar los endpoints de usuarios

const bcrypt = require('bcrypt'); // Importamos bcrypt 

const jwt = require('jsonwebtoken'); // Importamos jwt 

const { generateError } = require('../helpers'); // Importamos función de lanzamiento de errores 

const { createUser, getUserById, getUserByEmail } = require('../db/users'); // Importamos la función para crear usuarios en la BBDD 

//const { token } = require('morgan');

const newUserController = async (req, res, next) => {

    try { 

        const { email, password } = req.body; // const schema = 

        //OJO! EN EL PROYECTO SE HA DE VALIDAR CUALQUIERA DE LOS DATOS CON JOI

        if (!email || !password) { // Si no hay email o password

            
            throw generateError('We need an e-mail and a password', 400);

        }

        const id = await createUser(email, password); // Llamamos a la función para crear usuarios en la BBDD 

        res.send({

            status: 'error',
            message: `User created with id: ${id}`,
        })

    } catch (error) {

        next(error);     

    }

}

const getUserController = async (req, res, next) => {

    try {

        const { id } = req.params; 

        const user = await getUserById(id); // Llamamos a la función 

        res.send({

            status: 'error', 
            data: user 
        })

    } catch (error) {

        next(error); 
    }

};

const loginController = async (req, res, next) => {

    try {

        const { email, password } = req.body; // Enviamos datos al servidor por body

        if (!email || !password) { 
            
            throw generateError('Send e-mail and password', 400); 
        }

        const user = await getUserByEmail(email); // Recogemos los datos de la BBDD del usuario con ese mail

        const validPassword = await bcrypt.compare(password, user.password);// Comprobamos que la contraseña introducida por el usuario coincide con la que tenemos en la BBDD 

        if (!validPassword) {
            
            throw generateError('Password doesn`t match', 401); // 401 = No authorized
        }

        const payload = { // Creamos el payload del tokan
 
            id: user.id
        

    };

    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '3d', }); // Firma del token

            res.send({ // Envío del token
 
                status: 'ok',
                data: token,
            });

        } catch (error) {

            next(error); 
            
        }


    };

    module.exports = { // Exportamos las funciones controladoras de endpoints de users

        newUserController,
        getUserController,
        loginController
    }
