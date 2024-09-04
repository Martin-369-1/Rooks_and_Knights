//requiring modules
const express = require('express');
const router = express.Router();

//controllers
const adminController = require('../controllers/adminController');

//multer upload middleware
const upload = require('../utils/multerUtils');;

//middlewares
const adminMiddleware = require('../middlewares/adminAuthMiddleware');;

//Login 
router.get('/login', adminMiddleware.checkAdminAldreadyAuthenticated, adminController.getLogin);
router.post('/login', adminController.postLogin);
router.post('/logout', adminController.postLogout);


//Dashboard
router.get('/', adminMiddleware.checkAdminAuthenticated, adminController.getDashboard);

//Users
router.get('/users', adminMiddleware.checkAdminAuthenticated, adminController.getUsers);
router.patch('/users/blockUnblockUser/:id', adminMiddleware.validAdmin, adminController.patchBlockUnblockUser);

//Products
router.get('/products', adminMiddleware.checkAdminAuthenticated, adminController.getProducts);
router.get('/products/addProduct', adminMiddleware.checkAdminAuthenticated, adminController.getAddProduct);
router.post('/products/addProduct', [adminMiddleware.checkAdminAuthenticated, upload], adminController.postAddProduct);
router.get('/products/viewEditProduct/:id', adminMiddleware.checkAdminAuthenticated, adminController.getViewEditProduct);
router.put('/products/viewEditProduct/:id', [adminMiddleware.checkAdminAuthenticated, upload], adminController.putViewEditProduct);
router.delete('/products/deleteProduct/:id', adminMiddleware.validAdmin, adminController.deleteProduct);


//Categories;;
router.get('/categories', adminMiddleware.checkAdminAuthenticated, adminController.getCategories);
router.delete('/categories/deleteCategory/:id', adminMiddleware.validAdmin, adminController.deleteCategory);
router.put('/categories/editCategory/:id', adminMiddleware.validAdmin, adminController.putEditCategory)
router.post('/categories/addCategory', adminMiddleware.validAdmin, adminController.addCategory);


//subCategories
router.get('/subCategories',adminMiddleware.checkAdminAuthenticated,adminController.getSubCategory)
router.delete('/subCategories/deleteSubCategory/:id', adminMiddleware.validAdmin, adminController.deleteSubCategory);
router.put('/subCategories/editSubCategory/:id', adminMiddleware.validAdmin, adminController.putEditSubCategory)
router.post('/subCategories/addSubCategory', adminMiddleware.validAdmin, adminController.addSubCategory);


//orders
router.get('/orders',adminMiddleware.checkAdminAuthenticated,adminController.getOrders);
router.get('/orders/viewEditOrder/:id',adminMiddleware.checkAdminAuthenticated,adminController.getViewEditOrder);
router.patch('/orders/updateProductStauts/:id',adminMiddleware.validAdmin,adminController.patchChageProductStatus)

module.exports = router;