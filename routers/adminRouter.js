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
router.get('/login',adminMiddleware.checkAdminAldreadyAuthenticated, adminController.getLogin);

router.post('/login', adminController.postLogin);

router.post('/logout', adminController.postLogout);


//Dashboard
router.get('/', adminMiddleware.checkAdminAuthenticated, adminController.getDashboard);


//Users
router.get('/users', adminMiddleware.checkAdminAuthenticated, adminController.getUsers);

router.patch('/users/blockUnblockUser/:id', adminMiddleware.checkAdminAuthenticated, adminController.patchBlockUnblockUser);


//Products
router.get('/products', adminMiddleware.checkAdminAuthenticated, adminController.getProducts);

router.get('/products/addProduct', adminMiddleware.checkAdminAuthenticated, adminController.getAddProduct);

router.post('/products/addProduct', [adminMiddleware.checkAdminAuthenticated, upload], adminController.postAddProduct);

router.get('/products/viewEditProduct/:id', adminMiddleware.checkAdminAuthenticated, adminController.getViewEditProduct);

router.put('/products/viewEditProduct/:id', [adminMiddleware.checkAdminAuthenticated, upload], adminController.putViewEditProduct);

router.delete('/products/deleteProduct/:id', adminMiddleware.checkAdminAuthenticated, adminController.deleteProduct);


//Categories;;

router.get('/categories', adminMiddleware.checkAdminAuthenticated, adminController.getCategories);

router.delete('/categories/deleteCategory/:id', adminMiddleware.checkAdminAuthenticated, adminController.deleteCategory);

router.put('/categories/editCategory/:id', adminMiddleware.checkAdminAuthenticated, adminController.putEditCategory)

router.post('/categories/addCategory', adminMiddleware.checkAdminAuthenticated, adminController.addCategory);


//subCategories

router.delete('/categories/deleteSubCategory/:id', adminMiddleware.checkAdminAuthenticated, adminController.deleteSubCategory);

router.put('/categories/editSubCategory/:id', adminMiddleware.checkAdminAuthenticated, adminController.putEditSubCategory)

router.post('/categories/addSubCategory', adminMiddleware.checkAdminAuthenticated, adminController.addSubCategory);

module.exports = router;