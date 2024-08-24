const userCollection=require('../models/userModel');
const OTPUtils=require('../utils/OTPUtils');
const {hashPassword, passwordHasher}=require('../utils/passwordUtils')

exports.forgetPassword=async(email,req)=>{
    try{
        let user=await userCollection.findOne({email});
        if(!user){
            return "user doesnot exist"
        }
        
        console.log(email);
        
        // Generate and store OTP
        const OTP = OTPUtils.generateOTP();
        req.session.countdownTime = 30;
        req.session.email = email;
        console.log(email, OTP);

        await OTPUtils.storeOTP(email, OTP);

        // Send OTP
        try {
            await OTPUtils.sendOTP(email, OTP);
        } catch (otpError) {
            console.error('Failed to send OTP:', otpError);
            return 'Failed to send OTP. Please try again.';
        }

        // Start countdown
        OTPUtils.startCountdown(req);

    }catch(err){
        console.log(err);
        
    }
 
}

exports.resetPassword=async(password,email)=>{
    try{
        const hasedPassword=await passwordHasher(password)
        await userCollection.updateOne({email},{password:hasedPassword})
    }catch(err){
        console.log(err);  
    }
}