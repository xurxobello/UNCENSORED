const thumbUpController = async (req, res, next) => {
    try{
        res.send ({
            status: "error",
            message: "Not implemented"
        });
    }catch (error){
        next (error); 
}
};
const thumbDownController = async (req, res, next) => {
    try{
        res.send ({
            status: "error",
            message: "Not implemented"
        });
    }catch (error){
        next (error); 
}
};


module.exports =  {
    thumbUpController,
    thumbDownController,
    
};