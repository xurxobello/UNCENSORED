// Middlewares personalizados para autorizar la creación de opininones. 


const authUser = (req, res, next) => { 

    try {

        console.log(req.headers);

        next(); // Si llamamos aquí a la función next avanzará
        

    } catch (error) {

        next(error); // Llega al midd. de errores

    }

}

module.exports = { // Exportamos el midd. 

    authUser, 

}