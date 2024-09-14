//requiring modules
const express = require('express');
const router = express.Router();

//controllers
const adminController = require('../controllers/adminController');

//multer upload middleware
const upload = require('../utils/multerUtils');;

//middlewares
const adminMiddleware = require('../middlewares/adminAuthMiddleware');;

//routers
//Login 
router.get('/login', adminMiddleware.checkAdminAldreadyAuthenticated, adminController.getLogin); //display login page
router.post('/login', adminController.postLogin); //login 
router.post('/logout', adminController.postLogout); //logout


//Dashboard
router.get('/', adminMiddleware.checkAdminAuthenticated, adminController.getDashboard); //display dashboard

//Users
router.get('/users', adminMiddleware.checkAdminAuthenticated, adminController.getUsers); //display user list
router.patch('/users/blockUnblockUser/:id', adminMiddleware.validAdmin, adminController.patchBlockUnblockUser); //block or unblock user

//Products
router.get('/products', adminMiddleware.checkAdminAuthenticated, adminController.getProducts); //display products
router.get('/products/addProduct', adminMiddleware.checkAdminAuthenticated, adminController.getAddProduct); //display page to add a new product
router.post('/products/addProduct', [adminMiddleware.checkAdminAuthenticated, upload], adminController.postAddProduct); //add a new product
router.get('/products/viewEditProduct/:id', adminMiddleware.checkAdminAuthenticated, adminController.getViewEditProduct); //view specif product
router.post('/products/viewEditProduct/:id', [adminMiddleware.checkAdminAuthenticated, upload], adminController.putViewEditProduct);//edit a product
router.delete('/products/deleteProduct/:id', adminMiddleware.validAdmin, adminController.deleteProduct); //delete a product


//Categories;;
router.get('/categories', adminMiddleware.checkAdminAuthenticated, adminController.getCategories); //display categories
router.post('/categories/addCategory', adminMiddleware.validAdmin, adminController.addCategory); //add new category
router.put('/categories/editCategory/:id', adminMiddleware.validAdmin, adminController.putEditCategory) //edit a category
router.delete('/categories/deleteCategory/:id', adminMiddleware.validAdmin, adminController.deleteCategory); //delete a category


//subCategories
router.get('/subCategories', adminMiddleware.checkAdminAuthenticated, adminController.getSubCategory) //display sub categories
router.post('/subCategories/addSubCategory', adminMiddleware.validAdmin, adminController.addSubCategory); //add new sub category
router.put('/subCategories/editSubCategory/:id', adminMiddleware.validAdmin, adminController.putEditSubCategory) //edit a sub category
router.delete('/subCategories/deleteSubCategory/:id', adminMiddleware.validAdmin, adminController.deleteSubCategory); //delet a sub category


//orders
router.get('/orders', adminMiddleware.checkAdminAuthenticated, adminController.getOrders); //display orders
router.get('/orders/viewEditOrder/:id', adminMiddleware.checkAdminAuthenticated, adminController.getViewEditOrder);  //display specific order
router.patch('/orders/updateProductStauts/:id', adminMiddleware.validAdmin, adminController.patchChageProductStatus) //update product status

//returns
router.get('/returns', adminMiddleware.checkAdminAuthenticated, adminController.getReturns)
router.patch('/returns/aproveRejectReturn', adminMiddleware.validAdmin, adminController.patchAproveRejectReturn);

//transations
router.get('/transations', adminMiddleware.checkAdminAuthenticated, adminController.getTransations)

//offers
router.get('/offers',adminMiddleware.checkAdminAuthenticated,adminController.getOffers)
router.post('/offers/addOffer',adminMiddleware.validAdmin,adminController.postAddOffer);
router.delete('/offers/deleteOffer/:id',adminMiddleware.validAdmin,adminController.deleteOffer)

//coupons
router.get('/coupons',adminMiddleware.checkAdminAuthenticated,adminController.getCoupons);
router.post('/coupons/addCoupon',adminMiddleware.validAdmin,adminController.postAddCoupon)
router.delete('/coupons/deleteCoupon/:id',adminMiddleware.validAdmin,adminController.deleteCoupon);
router.put('/coupons/editCoupon/:id',adminMiddleware.validAdmin,adminController.putEditCoupon);

//sales
router.get('/sales',adminMiddleware.checkAdminAuthenticated,adminController.getSales)

module.exports = router;