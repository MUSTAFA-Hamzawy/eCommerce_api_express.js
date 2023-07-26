const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const status = require('../config/statusCodes');

const ValidateTokenMiddleware = asyncHandler( async (req, res, next)=>{
    const authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith('Bearer')){
        const token = authHeader.split(' ')[1];  // select the token
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedData)=>{
            if(err){
                res.status(status.UNAUTHORIZED);
                throw new Error("Not Authorized")
            }
            
            req.user = decodedData;
            next();
        })
    }
    else{
        res.status(status.UNAUTHORIZED);
        throw new Error("This user is not authenticated.");
    }


})

module.exports = ValidateTokenMiddleware;