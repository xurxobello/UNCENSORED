

// Creamos una funcion con la finalidad de generar un error que podamos usar en el futuro.
const generateError = (message, status) => {
    const error = new Error (message);
    error.httpStatus = status;
    return error;
};

module.exports =  {
    generateError,
}
