// Creamos función para lanzar errores


const generateError = (message, status) => {

    const error = new Error(message);

    error.httpStatus = status;

    return error; 
}

module.exports = { // Exportamos función de lanzamiento de errores 

    generateError,

};