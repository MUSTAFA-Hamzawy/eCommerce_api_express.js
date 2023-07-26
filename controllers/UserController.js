const asyncHandler = require('express-async-handler');
const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const status = require('../config/statusCodes');
const jwt = require('jsonwebtoken');


const getProfile = asyncHandler( async (req, res) => {
    res.json(req.user);     // this data coming from the ValidateTokenMiddleware
})

// To validate the data used for login
const validateLoginData = async (data)=>{
    const {emailOrUsername, password} = data;
   
    if(!emailOrUsername) return "Email is required.";
    if(!password) return "Password is required.";
    

    return 0;
}

// tokenType : 1 : access or 2 : refresh
const generateToken = (userData, tokenType = 1)=>{
    const SECRET_KEY = tokenType == 1 ? process.env.JWT_ACCESS_TOKEN_KEY : process.env.JWT_REFRESH_TOKEN_KEY;
    const EXPIRED_TIME = tokenType == 1 ? process.env.ACCESS_TOKEN_EXPIRED_TIME : process.env.REFRESH_TOKEN_EXPIRED_TIME;
    return jwt.sign(
        // Payload
        {
            id: userData.id,
            username: userData.username,
            email: userData.email,
            phoneNumber: userData.phoneNumber
        },
        SECRET_KEY,
        { expiresIn: EXPIRED_TIME} 
    )
}

const login = asyncHandler( async (req, res)=>{
    const {emailOrUsername, password} = req.body;
    const error = await validateLoginData({emailOrUsername, password});
    if(error != 0){
        res.status(status.VALIDATION_ERROR);
        throw new Error(JSON.stringify(error));
    }else{

        emailOrUsername.trim();
        const user = emailOrUsername.indexOf('@') == -1 ? await UserModel.findOne({username: emailOrUsername}) : await UserModel.findOne({email: emailOrUsername})
        const passwordIsCorrect = await bcrypt.compare(password, user.password);
        if(!user || !passwordIsCorrect){
            res.status(status.NOT_FOUND);
            throw new Error(JSON.stringify("Wrong email or password."));
        }     

        const token = generateToken(user);
        res.status(status.OK);
        res.json({token});
    }



})

const validateRegistrationData = async(data)=>{

    const{fullName, email, username, phoneNumber} = data;
    let errors = {};


    username.trim();

    // validate the name
    const nameRegex = /^(?!.*\s{2})[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
    if(!fullName) errors.fullName =  "Full name is required.";
    else {
        fullName.trim();
        if(!nameRegex.test(fullName))
            errors.fullName =  "Full name must contain only letters.";
    }

    // Checking if user have already registered
    if(!email) errors.email = "Email is required";
    else{
        email.trim();

        // validate email using regex
        const emailRegex = /^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if(!emailRegex.test(email)) errors.email = "This email is invalid.";
        else if(await UserModel.findOne({email})) errors.email  = "This email have been taken.";
    }



    // validate username
    if(!username) errors.username = "Username is required";
    else{
        const usernameRegex = /^[a-zA-Z0-9]+$/;
        if(!usernameRegex.test(username)) errors.username = "This username is invalid."
        else if(await UserModel.findOne({username})) errors.username = "This username is taken.";
    }

    // validate phoneNumber
    const phoneNumberRegex = /^(\+\d{1,15}|\d{1,15})$/;
    if(!phoneNumberRegex.test(phoneNumber)) errors.phoneNumber = "Invalid phone number.";

    return errors;
}

const register = asyncHandler( async (req, res, next)=>{
    const{fullName, email, username, phoneNumber, password} = req.body;


    const errors = await validateRegistrationData({fullName, email, username, phoneNumber, password});
    if(Object.keys(errors).length > 0){
        res.status(status.VALIDATION_ERROR);
        throw new Error(JSON.stringify(errors));
    }
    // encrypting the password
    const SALT_ROUNDS = 10;
    const encryptedPSWD = await bcrypt.hash(password, SALT_ROUNDS);
    const createdUser = await UserModel.create({fullName, email, username, phoneNumber, password: encryptedPSWD});
    if(createdUser)
        res.status(status.CREATED).json(createdUser);
    else {
        res.status(status.NOT_FOUND);
        throw new Error(JSON.stringify("Failed to register this user."))
    }

}
)

module.exports = {
    getProfile,
    login,
    register
}