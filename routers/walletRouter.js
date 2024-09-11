const express = require('express');
const router = express.Router();

//controllers
const walletController = require('../controllers/walletController')

//middlewares
const userAuthMiddleware = require('../middlewares/userAuthMiddleware')

router.get('/', userAuthMiddleware.checkUserAuthenticated, walletController.getWallet);
router.post('/addToWallet', userAuthMiddleware.validUser, walletController.postWallet);
router.post('/completePayment', userAuthMiddleware.validUser, walletController.completePayment);

module.exports = router;
