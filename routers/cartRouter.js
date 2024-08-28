const express=require('express');
const router=express.Router();

const cartController=require('../controllers/cartController')
const userAuthMiddleware=require('../middlewares/userAuthMiddleware')

router.get('/',userAuthMiddleware.checkUserAuthenticated,cartController.getCart);

router.post('/addToCart/:id',userAuthMiddleware.validUser,cartController.addToCart);

router.delete('/delete/:id',userAuthMiddleware.checkUserAuthenticated,cartController.deleteCartItem);

router.put('/abc',(req,res)=>{
    console.log(req.body);
    
    res.send(req.body)
})

router.put('/updateCart',userAuthMiddleware.checkUserAuthenticated,cartController.putUpdateCart);

router.patch('/')
module.exports=router;