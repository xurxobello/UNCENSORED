'use strict';
require('dotenv').config(); // carga las variables de entorno

const express = require('express');
const morgan = require('morgan');

const {
  // objeto copiado de users.js para exportarlo aquí.
  newUserController,
  getUserController,
  loginController,
  editUserMailController,
} = require('./controllers/users');

const {
  // objeto copiado de comments.js para exportarlo aquí.
  getCommentController,
  newCommentController,
  getSingleCommentController,
  deleteCommentController,
} = require('./controllers/comments');

const { authUser } = require('./middlewares/auth');

const {
  // objeto copiado de votes.js para exportarlo aquí.
  newVoteController,
} = require('./controllers/votes');

const app = express(); //donde definimos los middleware y para que escuche en un puerto (lsiten),permitiendo que escuche peticiones http, pasandola por todos los middelware y rutas que se defina.
app.use(express.json()); //Permite procesar lo que hay en el body de las peticiones. Por defecto express no lo hace.
app.use(morgan('dev'));

//RUTAS- ENDPOINTS.

//rutas de usuario

app.post('/user', newUserController); //Registro usuario
app.get('/user/:id', authUser, getUserController); // Devuelve info  del usuario
app.post('/user/login', loginController); // Login de usuario. Devuelve token
app.put('/user/edit', editUserMailController); // modificación del mail.

//rutas de comments

app.post('/comment', authUser, newCommentController); // Permite crear un comment
app.get('/comment', getCommentController); // lista todos los comments
app.get('/comment/:id', getSingleCommentController); // Devuelve un comment.
app.delete('/comment/:id', authUser, deleteCommentController); // Borra un comment, pero solo si eres tú el que lo ha cread
app.post('/comment/vote', authUser, newVoteController); //permite votar crear un voto  sobre un comment.

//MIDDLEWARE 404. Gestiona peticiones que no caen en ninguna ruta.

app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'not found',
  });
});

//MIDDLEWARE de gestión de errores. Gestionarpeticiones que aunque cayeron en ruta generaron error.

app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});

//Lanzamos el servidor
app.listen(3000, () => {
  console.log('Server on duty: working! :) ');
});
