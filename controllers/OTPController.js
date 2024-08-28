//utils
const OTPUtils = require('../utils/OTPUtils');

//render otp verify page
exports.getVerifyOTP = (req, res) => {
    res.render("OTP/verifyOTP", { email: req.session.email })
}

//verifies otp
exports.postVerifyOTP = async (req, res) => {
    const { OTP } = req.body;

    try {

        const isOTPVerified = await OTPUtils.verifyOTP(req.session.email, OTP);

        if (isOTPVerified) {
            req.session.isOTPVerified = true;
            req.session.save();
            res.status(200).json({ redirectUrl: req.session.OTPVerificationRedirect });
        } else {
            res.status(400).json({ error: "Invalid OTP" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Error verifying OTP');
    }
};

//render timer for resend otp
exports.getTimer = (req, res) => {
    if (!req.session.email) {
        return res.redirect('/user/register');
    }
    const remainingTime = req.session.countdownTime || 0;
    res.json({ remainingTime, email: req.session.email });
};

//handle resend otp
exports.postResendOTP = async (req, res) => {
    const email = req.session.email;
    const OTP = OTPUtils.generateOTP();

    try {
        await OTPUtils.storeOTP(email, OTP);

        req.session.countdownTime = 30;
        req.session.save();

        OTPUtils.startCountdown(req);

        await OTPUtils.sendOTP(email, OTP);
        req.session.email = email;
        req.session.save();

        res.redirect('/OTP/verifyOTP');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error sending OTP');
    }
};