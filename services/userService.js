//Requiring modules
const userCollection = require('../models/userModel')
const OTPUtils = require("../utils/OTPUtils")

exports.registerUser = async (username, email, phoneNumber, password, req) => {
    try {
        // Check if email already exists
        const emailExistAlready = await userCollection.findOne({ email });
        if (emailExistAlready) {
            return { success: false, message: 'Email already exists' };
        }

        // Check if phone number already exists
        const phoneNumberExistAlready = await userCollection.findOne({ phoneNumber });
        if (phoneNumberExistAlready) {
            return { success: false, message: 'Phone Number already exists' };
        }

        // Store user data in session
        req.session.username = username;
        req.session.email = email;
        req.session.phoneNumber = phoneNumber;
        req.session.password = password;
        req.session.save();

        // Generate and store OTP
        const OTP = OTPUtils.generateOTP();
        req.session.countdownTime = 30;
        console.log(email, OTP);

        await OTPUtils.storeOTP(email, OTP);

        // Send OTP
        try {
            await OTPUtils.sendOTP(email, OTP);
        } catch (otpError) {
            console.error('Failed to send OTP:', otpError);
            return { success: false, message: 'Failed to send OTP. Please try again.' };
        }

        // Start countdown
        OTPUtils.startCountdown(req);

        // Return success result
        return { success: true, redirectUrl: '/OTP/verifyOTP' };
    } catch (err) {
        console.error('Registration error:', err);
        return { success: false, message: 'Server error. Please try again later.' };
    }
}