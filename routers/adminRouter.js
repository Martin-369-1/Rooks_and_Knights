const express=require('express');
const router=express.Router();
const upload=require('../utils/multerUtils')

const adminController=require('../controllers/adminController');
const adminMiddleware=require('../middlewares/adminAuthMiddleware')

router.get('/login',adminMiddleware.checkAdminAldreadyAuthenticated,adminController.getLogin);

router.post('/login',adminController.postLogin);

router.post('/logout',adminController.postLogout)

router.get('/',adminMiddleware.checkAdminAuthenticated,adminController.getDashboard);

router.get('/users',adminMiddleware.checkAdminAuthenticated,adminController.getUsers);

router.patch('/users/blockUnblockUser/:id',adminMiddleware.checkAdminAuthenticated,adminController.patchBlockUnblockUser);

router.get('/products',adminMiddleware.checkAdminAuthenticated,adminController.getProducts);

router.get('/products/addProduct',adminMiddleware.checkAdminAuthenticated,adminController.getAddProduct);

router.post('/products/addProduct',[adminMiddleware.checkAdminAuthenticated,upload],adminController.postAddProduct);

router.get('/products/viewEditProduct/:id',adminMiddleware.checkAdminAuthenticated,adminController.getViewEditProduct)

router.put('/products/viewEditProduct/:id',[adminMiddleware.checkAdminAuthenticated,upload],adminController.putViewEditProduct);

router.delete('/products/deleteProduct/:id',adminMiddleware.checkAdminAuthenticated,adminController.deleteProduct);

router.get('/categories',adminMiddleware.checkAdminAuthenticated,adminController.getCategories);

router.delete('/categories/deleteCategory/:id',adminMiddleware.checkAdminAuthenticated,adminController.deleteCategory);

router.post('/categories/addCategory',adminMiddleware.checkAdminAuthenticated,adminController.addCategory);




module.exports=router;