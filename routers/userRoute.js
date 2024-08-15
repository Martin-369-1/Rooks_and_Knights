//Requiring modules
const express = require('express');
const router = express.Router();

//Controllers
const userController = require('../controllers/userController')

//middlewaress
const userAuthMiddleware = require('../middlewares/userAuthMiddleware')
const OTPMiddleware=require("../middlewares/OTPMiddleware")

//GET login
router.get('/login', userAuthMiddleware.checkUserAldreadyAuthenticated, userController.getLogin)

//POST login
router.post('/login', userController.postLogin)

//GET register
router.get('/register', [userAuthMiddleware.checkUserAldreadyAuthenticated,OTPMiddleware.checkOTPAldreadyVerified], userController.getRegister)

//POST register
router.post('/register', userController.postRegister)

//GET complete register
router.get('/completeRegister', [userAuthMiddleware.checkUserAldreadyAuthenticated,OTPMiddleware.checkOTPVerified], userController.getCompleteRegister)

//POST complete register
router.post('/completeRegister', userController.postCompleteRegister)

//POST logoout
router.post('/logout', userController.postLogout)


//temp home route
router.get('/home', userAuthMiddleware.checkUserAuthenticated, (req, res) => {
    res.render('home', { email: req.email })
})

module.exports = router;