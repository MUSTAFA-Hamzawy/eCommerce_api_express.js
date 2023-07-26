const status = require("../config/statusCodes");

const ErrorHandlerMiddleware = (err, req, res, next) => {
    const statusCode = res.statusCode || status.SERVER_ERROR;
    let errorType = "Server Error";

    switch (statusCode) {

        case status.SERVER_ERROR:
            errorType = "Server Error.";
            break;
        
        case status.VALIDATION_ERROR:
            errorType = "Validation Error.";
            break;
                    
        case status.UNAUTHORIZED:
            errorType = "Not Authorized.";
            break;
                    
        case status.NOT_FOUND:
            errorType = "404 Not Found.";
            break;
                    
        case status.FORBIDDEN:
            errorType = "Forbiddend.";
            break;
    }

    res.json(getErrorBody(errorType, JSON.parse(err.message)));
}


const getErrorBody = (errorType, msg) =>{
    return {
        errorType: errorType,
        errorDescription : msg
    }
}


module.exports = ErrorHandlerMiddleware;