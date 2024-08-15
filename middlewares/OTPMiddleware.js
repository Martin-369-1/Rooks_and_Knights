//Used where the user should be aldready verfied OTP
exports.checkOTPVerified = (req, res, next) => {
    if (!req.session.isOTPVerified) {
        return res.redirect('/OTP/OTPVerify')
    }
    next()
}

//Used where the user should not be aldready verfied OTP
exports.checkOTPAldreadyVerified = (req, res, next) => {
    if (req.session.isOTPVerified) {
        return res.redirect('/completeRegister')
    }
    next()
}