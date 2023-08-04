const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const status = require('../helpers/statusCodes');
const TokenBlackListModel = require('../models/TokenBlackListModel');

const ValidateTokenMiddleware = asyncHandler( async (req, res, next)=>{
    const authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith('Bearer')){
        const token = authHeader.split(' ')[1];  // select the token

        // Ensuring that this token is not included in the TokenBlackList
        const found = await TokenBlackListModel.findOne({token});
        if(found){
            res.status(status.UNAUTHORIZED);
            throw new Error(JSON.stringify("This user is not authenticated."));
        }

        // verifying the token
        jwt.verify(token, process.env.JWT_ACCESS_TOKEN_KEY, (err, decodedData)=>{
            if(err){
                res.status(status.UNAUTHORIZED);
                throw new Error(JSON.stringify("Not Authorized"))
            }
            req.user = decodedData;
            next();
        })
    }
    else{
        res.status(status.UNAUTHORIZED);
        throw new Error(JSON.stringify("This user is not authenticated."));
    }


})

module.exports = ValidateTokenMiddleware;