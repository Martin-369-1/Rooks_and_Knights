//Requiring modules
const express = require('express');
const router = express.Router();
const OTPRouter = require('../controllers/OTPController');


router.get('/verifyOTP', OTPRouter.getVerifyOTP);

router.post('/verifyOTP', OTPRouter.postVerifyOTP);

router.get('/timer', OTPRouter.getTimer);

router.post('/resendOTP', OTPRouter.postResendOTP);


module.exports = router;