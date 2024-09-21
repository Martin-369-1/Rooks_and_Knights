//requiring modules
const express = require('express');
const router = express();

//controllers
const shopController = require('../controllers/shopController')

//middlewares
const userAuthMiddleware = require('../middlewares/userAuthMiddleware');

router.get('/', shopController.getProductList)
router.get('/product/:id',userAuthMiddleware.getUser ,shopController.getProduct);
router.post('/product/addReview/:id', userAuthMiddleware.checkUserAuthenticated, shopController.postReview);


module.exports = router;