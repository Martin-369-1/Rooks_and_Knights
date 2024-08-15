const crypto = require('crypto');
// const nodemailer = require('nodemailer'); // Add NodeMailer
const OTPCollection = require('../models/OTPModel')
const transporter = require('../config/emailConfig')

// Generate OTP
exports.generateOTP = () => {
    return crypto.randomInt(1000, 9999).toString();
}


// Store OTP in DB
exports.storeOTP = async (email, OTP) => {
    console.log(email, OTP);

    const expires = new Date(Date.now() + process.env.OTP_EXPIRY_MINUTES * 60 * 1000);
    try {
        await OTPCollection.findOneAndUpdate(
            { email },
            { email, OTP, expires },
            { upsert: true, new: true }
        );
    } catch (err) {
        console.log(err);
        throw new Error('Error storing OTP');
    }
}


// Send OTP via NodeMailer
exports.sendOTP = async (email, OTP) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email, // Adjust this according to your phone number to email mapping
        subject: 'Verify Your Email for Rooks and Knights',
        text: `${email},

Thank you for registering with Rooks and Knights!
To complete your registration, please verify your email address by entering the One-Time Password (OTP) provided below:

OTP: ${OTP}

This OTP is valid for the next 5 minutes. If you did not request this verification, please disregard this email.

Best regards,
The Rooks and Knights Team`
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error);
        throw new Error('Error sending OTP');
    }
}

// Verify OTP
exports.verifyOTP = async (email, OTP) => {
    try {
        const record = await OTPCollection.findOne({ email });

        if (!record) return false;

        if (Date.now() > record.expires) {
            await OTPCollection.deleteOne({ email });
            return false;
        }

        if (record.OTP === OTP) {
            await OTPCollection.deleteOne({ email });
            return true;
        }

        return false;
    } catch (err) {
        console.log(err);
        throw new Error('Error verifying OTP');
    }
}

// Start Countdown Timer
exports.startCountdown = (req) => {
    const intervalId = setInterval(() => {
        if (req.session.countdownTime > 0) {
            req.session.countdownTime--;
            req.session.save();
        } else {
            clearInterval(intervalId);
        }
    }, 1000);
}



