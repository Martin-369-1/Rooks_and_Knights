//Requiring modules
const express = require('express');
const router = express.Router();
const passport=require('passport')
const generateAccessToken=require('../utils/JWTUtils')

//Controllers
const userController = require('../controllers/userController');

//middlewaress
const userAuthMiddleware = require('../middlewares/userAuthMiddleware');
const OTPMiddleware = require("../middlewares/OTPMiddleware");


//Routers
//Login
router.get('/login', userAuthMiddleware.checkUserAldreadyAuthenticated, userController.getLogin);
router.post('/login', userController.postLogin);
router.post('/logout', userController.postLogout);


//Register
router.get('/register', userAuthMiddleware.checkUserAldreadyAuthenticated, userController.getRegister);
router.post('/register', userController.postRegister);


//Complete Register
router.get('/completeRegister', [userAuthMiddleware.checkUserAldreadyAuthenticated, OTPMiddleware.checkOTPVerified], userController.getCompleteRegister);
router.post('/completeRegister', userController.postCompleteRegister);


//google Auth
router.get('/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/google/callback',passport.authenticate('google',{failureRedirect:'/user/login'}),userController.getGoogleCallback)


//temp home route
router.get('/account', userAuthMiddleware.checkUserAuthenticated, (req, res) => {
    res.render('account', { email: req.email });
})

router.get('/forgetPassword',userController.getForgetPassword)
router.post('/forgetPassword',userController.postForgetPassword)
router.get('/resetPassword',OTPMiddleware.checkOTPVerified , userController.getResetPassword)
router.post('/resetPassword',userController.postResetPassword)

module.exports = router;