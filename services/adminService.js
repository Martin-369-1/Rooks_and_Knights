//Requiring modules
const userCollection = require('../models/userModel')
const OTPUtils = require("../utils/OTPUtils")
const passwordUtils=require('../utils/passwordUtils')


exports.findUserByEmail=async(email)=>{
    const admin=await userCollection.findOne({ email ,isAdmin:true});
    console.log(admin);
    
    return admin;
}

exports.validateUserCredentials = async (password, userPasswordHash) => {
    return await passwordUtils.comparePassword(password, userPasswordHash);
};