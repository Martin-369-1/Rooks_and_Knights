//Requiring modules
const express = require('express');
const router = express.Router();

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
router.get('/register', [userAuthMiddleware.checkUserAldreadyAuthenticated, OTPMiddleware.checkOTPAldreadyVerified], userController.getRegister);

router.post('/register', userController.postRegister);


//Complete Register
router.get('/completeRegister', [userAuthMiddleware.checkUserAldreadyAuthenticated, OTPMiddleware.checkOTPVerified], userController.getCompleteRegister);

router.post('/completeRegister', userController.postCompleteRegister);

;
//temp home route
router.get('/home', userAuthMiddleware.checkUserAuthenticated, (req, res) => {
    console.log("dkjf;alksdfjlk");
    
    res.render('home', { email: req.email });
})

module.exports = router;