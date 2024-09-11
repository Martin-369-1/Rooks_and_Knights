//requiring modules
const express = require('express')
const router = express.Router()

//controllers
const orderController = require('../controllers/orderController');

//middlewares
const userAuthMiddleware = require('../middlewares/userAuthMiddleware')

router.get('/', userAuthMiddleware.checkUserAuthenticated, orderController.getCheckout);
router.post('/proceedToPayment', userAuthMiddleware.validUser, orderController.postCheckout);
router.patch('/cancel/:id', userAuthMiddleware.validUser, orderController.patchCancel)
router.patch('/return/returnProduct/:id', userAuthMiddleware.validUser, orderController.patchReturn);

router.post('/completePayment', userAuthMiddleware.checkUserAuthenticated, orderController.completePayment)

module.exports = router;