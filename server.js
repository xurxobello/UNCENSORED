// Archivo principal


require('dotenv').config(); // Carga de variables de entorno

// Importamos módulos

const express = require('express');
const morgan = require('morgan');
//const Joi = require('@hapi/joi');

const { 

    newUserController,
    getUserController,
    loginController

} = require('./controllers/users');

const { 

    getOpinionController,
    newOpinionController,
    getSingleOpinionController,
    
} = require('./controllers/opinions');


const app = express(); // El objeto app es donde definimos los middleware, las rutas, etc.

app.use(morgan('dev')); // Midd. morgan para que imprima en consola el tipo de petición que hacemos

app.use(express.json()); // Midd. express.json convierte a json los datos 

// Endpoints:

// Usuarios

app.post('/user', newUserController); // Ruta para nuevos usuarios 
app.get('/user/:id', getUserController); // Ruta para obtener el id del usuario 
app.post('/login', loginController); // Ruta para acceso de usuarios 

// Opinion

app.post('/', newOpinionController); // Ruta para nueva opinión de un usuario
app.get('/', getOpinionController); // Ruta para obtener todas las opiniones de un usuario
app.get('/tweet/:id', getSingleOpinionController); // Ruta para obtener el id de una opinión



app.use((req, res) => { // Middelware que se encarga de gestinar las peticiones que no encuentran ruta

    res.status(404).send({ // Error de código 404, indica que la página no ha sido encontrada 

        status: 'error',

        message: 'Not found',

    });

});

app.use((error, req, res, next) => { // Middleware de gestión de errores, siempre con 4 parámetros.  

    console.log(error);

    res.status(error.httpStatus || 500).send({ // .httpStatus, indica que es un error incluido en el http code
        status: 'error',
        message: error.message
    }); 
});

app.listen(9000, () => { // Lanzamos el servidor
    
    console.log('Running!');

});