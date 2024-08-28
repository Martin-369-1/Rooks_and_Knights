const express=require('express');
const router=express();
const userAuthMiddleware=require('../middlewares/userAuthMiddleware');

const shopController=require('../controllers/shopController')

router.get('/',shopController.getProductList)

router.get('/product/:id',shopController.getProduct);

router.post('/product/addReview/:id',userAuthMiddleware.checkUserAuthenticated,shopController.postReview);


module.exports=router;