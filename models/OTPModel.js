const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OTPSchema = Schema({
    email: {
        type: String,
        required: true,
    },
    OTP: {
        type: String,
        required: true
    },
    expires: {
        type: Date,
        required: true
    },


}, { timeStamp: true })

OTPSchema.index({ expires: 1 }, { expireAfterSeconds: 0 })

const OTP = mongoose.model('otps', OTPSchema);

module.exports = OTP;