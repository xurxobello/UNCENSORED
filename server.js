"use strict"
require ("dotenv").config (); // carga las variables de entorno
const express = require ("express");
const morgan = require ("morgan");

const app= express(); //donde definimos los middleware y para que escuche en un puerto (lsiten),permitiendo que escuche peticiones http, pasandola por todos los middelware y rutas que se defina.

app.use (morgan("dev"));

//RUTAS- ENDPOINTS

//MIDDLEWARE 404. Gestiona peticiones que no caen en ninguna ruta.

app.use((req, res) => {
    res.status (404).send ({
        status: "error",
        message: "not found",
    })
})


//MIDDLEWARE de gestión de errores. Gestionarpeticiones que aunque cayeron en ruta generaron error. 

app.use((error, req, res,next)=>{
console.error (error);

    res.status(error.httpStatus || 500).send ({
        status:"error",
        message: error.message
    });
});


//Lanzamos el servidor
app.listen (3000,() => {
    console.log("Server on duty: working! :) ");

})