//requiring modules
const express = require('express')
const router = express.Router()

//controllers
const orderController = require('../controllers/orderController');

//middlewares
const userAuthMiddleware = require('../middlewares/userAuthMiddleware')

router.get('/', userAuthMiddleware.checkUserAuthenticated, orderController.getCheckout);
router.post('/proceedToPayment', userAuthMiddleware.validUser, orderController.postCheckout);
router.post('/pendingProceedToPayment', userAuthMiddleware.validUser, orderController.postPendingCheckout);
router.patch('/cancel/:id', userAuthMiddleware.validUser, orderController.patchCancel)
router.patch('/return/returnProduct/:id', userAuthMiddleware.validUser, orderController.patchReturn);

router.post('/completePayment', userAuthMiddleware.checkUserAuthenticated, orderController.completePayment)

//add coupon
router.post('/addCoupon',userAuthMiddleware.validUser,orderController.postAddCouponDiscount)

//download Invoice pdf
router.get('/downloadInvoicePdf/:id',userAuthMiddleware.checkUserAuthenticated,orderController.invoiceDownload)

module.exports = router;