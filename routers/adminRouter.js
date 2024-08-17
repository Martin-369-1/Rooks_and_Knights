const express=require('express');
const router=express.Router();

const adminController=require('../controllers/adminController');

router.get('/users',adminController.getUsers);

router.patch('/users/blockUnblockUser/:id',adminController.patchBlockUnblockUser);

router.get('/products',adminController.getProducts);

router.get('/products/addProduct',adminController.addProduct)

router.get('/categories',adminController.getCategories)

router.delete('/categories/deleteCategory/:id',adminController.deleteCategory)

router.post('/categories/addCategory',adminController.addCategory)

router.get('/categories/products',adminController.getProducts)



module.exports=router;