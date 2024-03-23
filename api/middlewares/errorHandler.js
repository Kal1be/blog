const { constantes } = require("../constantes");



const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode ? res.statusCode :500;

    switch (statusCode) {
        case constantes.FORBIDDEN:
            res.json({title:"Forbidden",message:err.message,stackTrace:err.stack})
            
            break;
        case constantes.NOT_FOUND:
            res.json({title:"Not_Found",message:err.message,stackTrace:err.stack})
            break
        case constantes.SERVER_ERROR:
            res.json({title:"Server_Error",message:err.message,stackTrace:err.stack})
            break
        case constantes.UNHAUTHORIZED:
            res.json({title:"Unhauthorized",message:err.message,stackTrace:err.stack})
            break
        case constantes.VALIDATION_ERROR:
            res.json({title:"Validation_error",message:err.message,stackTrace:err.stack})
            break
        default:
            console.log("no error all good !")
            break;
    }
}


module.exports = errorHandler