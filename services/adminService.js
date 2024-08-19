//Requiring modules
const userCollection = require('../models/userModel')
const OTPUtils = require("../utils/OTPUtils")
const passwordUtils=require('../utils/passwordUtils')


exports.findUserByEmail=async(email)=>{
    return await userCollection.findOne({ email ,isAdmin:true});
}

exports.validateUserCredentials = async (password, userPasswordHash) => {
    return await passwordUtils.comparePassword(password, userPasswordHash);
};