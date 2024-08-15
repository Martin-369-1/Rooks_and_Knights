//Requiring modules
const express = require('express');
const router = express.Router();
const OTPRouter=require('../controllers/OTPController')

//GET Verify OTP
router.get('/verifyOTP',OTPRouter.getVerifyOTP)

//POST Verify OTP
router.post('/verifyOTP',OTPRouter.postVerifyOTP)

//Timer for resend OTP
router.get('/timer', OTPRouter.getTimer);

//POST resend OTP
router.post('/resendOTP',OTPRouter.postResendOTP)
module.exports=router;