//Used where the user should be aldready verfied OTP
exports.checkOTPVerified = (req, res, next) => {
    if (!req.session.isOTPVerified) {
        return res.redirect('/OTP/verifyOTP')
    }
    next()
}

exports.isEmailEntered = (req, res, next) => {
    if (!req.session.email) {
        return res.redirect('/user/login')
    }
    next()
}