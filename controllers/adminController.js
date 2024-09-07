//Services
const adminUserService = require('../services/adminUserService');
const adminCategoryService = require('../services/adminCategoryService');
const adminSubCategoryService = require('../services/adminSubCategoryServices')
const adminProductService = require('../services/adminProductService');
const adminService = require('../services/adminService');
const adminOrderService=require('../services/adminOrderService');
const adminReturnService=require('../services/adminReturnService')

//Utils
const generateAccessToken = require('../utils/JWTUtils');

//Render login page
exports.getLogin = (req, res) => {
    res.render('admin/login')
}

//handles user login
exports.postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) { //when email and password not entered
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const adminData = await adminService.findUserByEmail(email);

        if (!adminData) { //when email doesnot exist in database
            return res.status(400).json({ error: 'Admin does not exist' });
        }

        const isValidPassword = await adminService.validateUserCredentials(password, adminData.password);

        if (!isValidPassword) { //If the password entered is not valid
            return res.status(400).json({ error: 'Incorrect password' });
        }

        //creating and storing JWT access token to in the cookie
        const accessToken = generateAccessToken(email);
        res.cookie('token', accessToken, { httpOnly: true, sameSite: 'Strict' });

        res.redirect('/admin');

    } catch (err) {
        console.error(err);
        res.status(500).json({error:"Server Error"})
    }
}

//handles logout
exports.postLogout = (req, res) => {
    res.clearCookie('token');
    res.status(200).redirect('/admin/login');
}

//render dashboard
exports.getDashboard = async (req, res) => {
    res.render('admin/dashboard')
}

//renders users list page
exports.getUsers = async (req, res) => {
    try {
        const {search,page}=req.query;
        const currentPage = page || 1;
        const noOfList = 6;
        const skipPages = currentPage - 1
        
        const {userList,totalNoOfList} = await adminUserService.userList(search,currentPage,noOfList,skipPages);
        const totalNoOfPages = totalNoOfList / noOfList;

        res.render('admin/users.ejs', { userList ,searchFilter:search || null,currentPage,totalNoOfPages})

    } catch (err) {
        console.log(err);
        res.redirect('/error');

    }

}

//Block or Unblock user 
exports.patchBlockUnblockUser = async (req, res) => {
    
    try {
        userID = req.params.id;
        await adminUserService.blockUnblockUser(userID)
        res.json({success:true})

    }
    catch (err) {
        console.log( err);
        res.status(500).json({error:"Server Error"})

    }
}

//renderes product page
exports.getProducts = async (req, res) => {
    try {
        const {search,page}=req.query;
        const currentPage = page || 1;
        const noOfList = 6;
        const skipPages = currentPage - 1

        const {productList,totalNoOfList} = await adminProductService.productList(search,currentPage,noOfList,skipPages);
        const totalNoOfPages = totalNoOfList / noOfList;

        res.render('admin/products', { productList ,searchFilter:search || null,currentPage,totalNoOfPages})

    } catch (err) {
        console.log(err);
        res.redirect('/error');

    }
}

//render page to add new product
exports.getAddProduct = async (req, res) => {
    const categories = await adminProductService.categories();
    const subCategories = await adminProductService.subCategories();

    res.render('admin/addProduct', { categories, subCategories, error: req.flash('ProductError') || '' })

}

//Adds new product
exports.postAddProduct = async (req, res) => {
    try {
        const error = await adminProductService.addProduct(req, res)
        if (error) {
            req.flash('ProductError', error)
            return res.redirect('/admin/products/addProduct')
        }
        res.redirect('/admin/products')

    } catch (err) {
        console.log(err);
        res.redirect('/error');
    }
}

//render product detailed page
exports.getViewEditProduct = async (req, res) => {
    try {
        const productID = req.params.id;


        const categories = await adminProductService.categories();
        const subCategories = await adminProductService.subCategories();
        const product = await adminProductService.viewProduct(productID);


        res.render('admin/viewEditProduct', { product, categories, subCategories })


    } catch (err) {
        console.log(err);
        res.redirect('/error');

    }
}

//update product
exports.putViewEditProduct = async (req, res) => {
    try {
        const userID = req.params.id;
        await adminProductService.editProduct(req, res, userID)
        res.redirect('/admin/products')

    } catch (err) {
        console.log(err);
        res.redirect('/error');
    }
}

//delete product
exports.deleteProduct = async (req, res) => {
    try {
        const userID = req.params.id;
        await adminProductService.deleteProduct(userID);
        res.json({success:true})


    } catch (err) {
        console.log(err);
        res.redirect('/error');

    }
}


//Categories and subCategory get
exports.getCategories = async (req, res) => {
    try {
        const {search,page}=req.query;
        const currentPage = page || 1;
        const noOfList = 6;
        const skipPages = currentPage - 1
        const {categoryList,totalNoOfList} = await adminCategoryService.categoryList(search,currentPage,noOfList,skipPages);
        const totalNoOfPages = totalNoOfList / noOfList;
        res.render('admin/categories', { categoryList,searchFilter:search || null,currentPage,totalNoOfPages})


    } catch (err) {
        console.log(err);
        res.redirect('/error');

    }

}


//categories

//add new category
exports.addCategory = async (req, res) => {
    try {
        const { categoryName, categoryDescription } = req.body;

        if (!categoryName || !categoryDescription) { //check categoryName and description are empty
            return res.status(400).json({error:"category name or category name should not be empty"})
        }
        const error = await adminCategoryService.addCategory(categoryName, categoryDescription)

        if (error) {
            req.flash('CategoryError', error)
            return res.status(400).json({error})
        }

        res.status(200).json({success:true});

    } catch (err) {
        console.log( err);
        res.status(500).json({error:"Server Error"})
    }
}

//edit category
exports.putEditCategory = async (req, res) => {
    try {
        const categoryID = req.params.id;
        const { categoryName, categoryDescription } = req.body;

        if (!categoryName || !categoryDescription) {
            return res.status(400).json({error:"category name or category description should not be empty"})
        }

        const error = await adminCategoryService.editCategory(categoryID, categoryName, categoryDescription);
        if (error) {
            return res.status(400).json({error})
        }

        res.status(200).json({success:true})

    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Server Error"})
    }
}

//delete specific category
exports.deleteCategory = async (req, res) => {
    try {
        const categoryID = req.params.id;
        const error = await adminCategoryService.deleteCategory(categoryID);

        if (error) {       
            return res.status(400).json({error})
        }

        res.status(200).json({success:true})

    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Server Error"})
    }
}

//subCategory
//list sub categories
exports.getSubCategory=async(req,res)=>{
    try {
        const {search,page}=req.query;
        const currentPage = page || 1;
        const noOfList = 6;
        const skipPages = currentPage - 1
        const {subCategoryList,totalNoOfList} = await adminSubCategoryService.subCategoryList(search,currentPage,noOfList,skipPages);
        
        const totalNoOfPages = totalNoOfList / noOfList;
        res.render('admin/subCategories', { subCategoryList,searchFilter:search || null,currentPage,totalNoOfPages})


    } catch (err) {
        console.log(err);
        res.redirect('/error');

    }
}

exports.addSubCategory = async (req, res) => {
    try {
        const { subCategoryName, subCategoryDescription } = req.body;

        if (!subCategoryName || !subCategoryDescription) {
            return res.status(400).json({error:"subCategory name or subCategory description should not be empty"})
        }

        const error = await adminSubCategoryService.addSubCategory(subCategoryName, subCategoryDescription)

        if (error) {
            return res.status(400).json({error})
        }

        res.status(200).json({success:true})

    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Server Error"})

    }
}

//edit subcategory
exports.putEditSubCategory = async (req, res) => {
    try {
        const subCategoryID = req.params.id;
        const { subCategoryName, subCategoryDescription } = req.body;

        if (!subCategoryName || !subCategoryDescription) {
            req.flash('SubCategoryError', "subCategory name or subCategory description should not be empty")
            return res.status(400).json({error:"subCategory name or subCategory description should not be empty"})
        }
        const error = await adminSubCategoryService.editSubCategory(subCategoryID , subCategoryName, subCategoryDescription);
        if (error) {
            return res.status(400).json({error})
        }

        res.status(200).json({success:true})

    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Server Error"})
    }
}

//delete specific subcategory
exports.deleteSubCategory = async (req, res) => {
    try {
        const subCategoryID  = req.params.id;
        const error = await adminSubCategoryService.deleteSubCategory(subCategoryID );
        if (error) {
            return res.status(400).json({error})
        }
        res.status(200).json({success:true})

    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Server Error"})

    }
}

//orders

//getorders
exports.getOrders=async(req,res)=>{
    try{
        const {page}=req.query;
        const currentPage = page || 1;
        const noOfList = 6;
        const skipPages = currentPage - 1
        const {orders,totalNoOfList}=await adminOrderService.viewOrders(currentPage,noOfList,skipPages);
        const totalNoOfPages = totalNoOfList / noOfList;
        
        res.render('admin/orders', { orders ,currentPage,totalNoOfPages})
    }catch(err){
        console.log(err); 
        res.redirect('/error')
    }
}

//get specific order
exports.getViewEditOrder=async(req,res)=>{
    try{
        const orderID=req.params.id;
        const {order,address}=await adminOrderService.viewOrder(orderID);
        res.render('admin/viewEditOrder',{order,address});

    }catch(err){
        console.log(err);
        res.redirect('/error')  
    }
}

//change product status
exports.patchChageProductStatus=async(req,res)=>{
    try{
        const productOrderID=req.params.id;
        const {orderID,status}=req.body;
        await adminOrderService.changeProductStatus(productOrderID,orderID,status)
        res.json({success:true})
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Server Error"})
    }
}

//returns
//display returns
exports.getReturns=async(req,res)=>{
    try{
        const returnList=await adminReturnService.returnsList();
        
        res.render('admin/returns',{returnList})
    }catch(err){
        console.log(err);
        
    }
}




