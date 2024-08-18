const express=require('express');
const router=express.Router();
const upload=require('../utils/multerUtils')

const adminController=require('../controllers/adminController');

router.get('/users',adminController.getUsers);

router.patch('/users/blockUnblockUser/:id',adminController.patchBlockUnblockUser);

router.get('/products',adminController.getProducts);

router.get('/products/addProduct',adminController.getAddProduct);

router.post('/products/addProduct',upload,adminController.postAddProduct);

router.get('/products/viewEditProduct/:id',adminController.getViewEditProduct)

router.put('/products/viewEditProduct/:id',(req,res)=>{
    console.log(req.body);

});

router.delete('/products/deleteProduct/:id',adminController.deleteProduct);

router.get('/categories',adminController.getCategories);

router.delete('/categories/deleteCategory/:id',adminController.deleteCategory);

router.post('/categories/addCategory',adminController.addCategory);




module.exports=router;