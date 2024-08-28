//Requiring modules
const express = require('express');
const router = express.Router();
const OTPRouter = require('../controllers/OTPController');
const OTPMiddleware=require('../middlewares/OTPMiddleware')


router.get('/verifyOTP',OTPMiddleware.isEmailEntered, OTPRouter.getVerifyOTP);

router.post('/verifyOTP', OTPRouter.postVerifyOTP);

router.get('/timer', OTPRouter.getTimer);

router.post('/resendOTP', OTPRouter.postResendOTP);


module.exports = router;