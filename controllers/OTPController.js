const {verifyOTP}=require('../utils/OTPUtils');

exports.getVerifyOTP=(req,res)=>{
    res.render("OTP/verifyOTP",{email:req.session.email})
}

exports.postVerifyOTP = async (req, res) => {
    const { OTP } = req.body;

    try {
        
        const isOTPVerified = await verifyOTP(req.session.email, OTP);

        if (isOTPVerified) {
            req.session.isOTPVerified = true;
            req.session.save();
            res.status(200).json({ redirectUrl: '/completeRegister' });
        } else {
            res.status(400).json({error:"Invalid OTP"});
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Error verifying OTP');
    }
};