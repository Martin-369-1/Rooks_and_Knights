//requiring modules
const express=require('express')
const router=express.Router();

//controllers
const addressController=require('../controllers/addressController')

//middlewares
const userAuthMiddleware=require('../middlewares/userAuthMiddleware')

router.post('/add',userAuthMiddleware.validUser,addressController.postNewAddress)
router.delete('/delete/:id',userAuthMiddleware.validUser,addressController.deleteAddress)
router.put('/edit/:id',userAuthMiddleware.validUser,addressController.putAddress)

module.exports=router;