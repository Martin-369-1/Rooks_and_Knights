//Requiring modules
const express = require('express');
const router = express.Router();
const OTPRouter=require('../controllers/OTPController')

//GET Verify OTP
router.get('/verifyOTP',OTPRouter.getVerifyOTP)

//POST Verify OTP
router.post('/verifyOTP',OTPRouter.postVerifyOTP)


module.exports=router;