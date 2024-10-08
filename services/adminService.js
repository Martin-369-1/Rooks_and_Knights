//Requiring modules
const userCollection = require('../models/userModel')
const OTPUtils = require("../utils/OTPUtils")
const passwordUtils = require('../utils/passwordUtils')


exports.findUserByEmail = async (email) => {
    const admin = await userCollection.findOne({ email, isAdmin: true });
    return admin;
}

exports.validateUserCredentials = async (password, userPasswordHash) => {
    //checks password and stored password same
    return await passwordUtils.comparePassword(password, userPasswordHash);
};