//Services
const adminUserService=require('../services/adminUserService');
const adminCategoryService=require('../services/adminCategoryService');
const adminSubCategoryService=require('../services/adminSubCategoryServices')
const adminProductService=require('../services/adminProductService');
const adminService=require('../services/adminService');

//Utils
const generateAccessToken=require('../utils/JWTUtils');

//Login 
exports.getLogin=(req,res)=>{
    res.render('admin/login')
}

exports.postLogin=async(req,res)=>{
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const adminData = await adminService.findUserByEmail(email);
        console.log(adminData);
        
        if (!adminData) {
            return res.status(400).json({ error: 'Admin does not exist' });
        }

        const isValidPassword = await adminService.validateUserCredentials(password, adminData.password);
        if (!isValidPassword) {
            return res.status(400).json({ error: 'Incorrect password' });
        }

        const accessToken = generateAccessToken(email);

        res.cookie('token', accessToken, { httpOnly: true, sameSite: 'Strict' });
        
        res.redirect('/admin')
    } catch (err) {
        console.error(err);
        res.redirect('/error')
    }
}

exports.postLogout=(req,res)=>{
    res.clearCookie('token');
    res.status(200).redirect('/admin/login');
}



//Dashboard
exports.getDashboard=async(req,res)=>{
    res.render('admin/dashboard')
}



//Users
exports.getUsers=async (req,res)=>{
    try{
        let userList=await adminUserService.userList();
        res.render('admin/users.ejs',{userList})
    }catch(err){
        console.log(err);
        res.redirect('/error');     
    }
       
}

exports.patchBlockUnblockUser=async (req,res)=>{
    _id=req.params.id;
    try{
        await adminUserService.blockUnblockUser(_id)
        res.redirect('/admin/users')
    }
    catch(err){
        console.log(err);
        res.redirect('/error');
        
    }
}




//Products
exports.getProducts=async(req,res)=>{
    try{
        let productList=await adminProductService.productList();
        res.render('admin/products',{productList})
    }catch(err){
        console.log(err); 
        res.redirect('/error'); 
    }
}

exports.getAddProduct=async (req,res)=>{
    let categories=await adminProductService.categories();
    let subCategories=await adminProductService.subCategories();
    
    res.render('admin/addProduct',{categories,subCategories,error:req.flash('addProductError') || ''})
    
}

exports.postAddProduct=async (req,res)=>{
    try{
        let error=await adminProductService.addProduct(req,res)
        if(error){
            req.flash('addProductError',error)
            return res.redirect('/admin/products/addProduct')
        }
        res.redirect('/admin/products')
    }catch(err){
        console.log(err); 
        res.redirect('/error');     
    }
}

exports.getViewEditProduct=async(req,res)=>{
    try{
        let _id=req.params.id;
        
        
        let categories=await adminProductService.categories();
        let subCategories=await adminProductService.subCategories();
        let product=await adminProductService.viewProduct(_id);
        
        
        res.render('admin/viewEditProduct',{product,categories,subCategories})

    }catch(err){
        console.log(err);
        res.redirect('/error');
        
    }
}

exports.putViewEditProduct=async(req,res)=>{
    let _id=req.params.id;
    
    try{
        await adminProductService.editProduct(req,res,_id)
        res.redirect('/admin/products')
    }catch(err){
        console.log(err);
        res.redirect('/error');       
    }
}

exports.deleteProduct=async (req,res)=>{
    try{
        let _id=req.params.id;
        await adminProductService.deleteProduct(_id);
        res.redirect('/admin/products')
    }catch(err){
        console.log(err);
        res.redirect('/error');
        
    }
}




//Categories and subCategory get
exports.getCategories=async (req,res)=>{
    try{
        let categoryList=await adminCategoryService.categoryList();
        let subCategoryList=await adminSubCategoryService.subCategoryList();
        res.render('admin/categories',{categoryList,subCategoryList,categoryError:req.flash('addCategoryError') || '',subCategoryError:req.flash('addSubCategoryError') || ''})
    }catch(err){
        console.log(err);
        res.redirect('/error');
        
    }
    
}


//categories
exports.addCategory=async (req,res)=>{
    try{
        const {categoryName}=req.body;
        
        let error=await adminCategoryService.addCategory(categoryName)
    
        if(error){
            req.flash('addCategoryError',error)
        }

        res.redirect('/admin/categories')
    }catch(err){
        console.log(err);
        res.redirect('/error');
        
    }
}

exports.putEditCategory=async(req,res)=>{
    try{
        const _id=req.params.id;
        const {categoryName}=req.body;
        let error=await adminCategoryService.editCategory(_id,categoryName);
        if(error){
            req.flash('addCategoryError',error)
        }

        res.redirect('/admin/categories')
    }catch(err){
        console.log(err);
        res.redirect('/error');
    }
}

exports.deleteCategory=async (req,res)=>{
    try{
        let _id=req.params.id;
        await adminCategoryService.deleteCategory(_id);
        res.redirect('/admin/categories')
    }catch(err){
        console.log(err);
        res.redirect('/error');
        
    }
}

//subCategory

exports.addSubCategory=async (req,res)=>{
    try{
        const {subCategoryName}=req.body;
        
        let error=await adminSubCategoryService.addSubCategory(subCategoryName)
    
        if(error){
            req.flash('addSubCategoryError',error)
        }

        res.redirect('/admin/categories')
    }catch(err){
        console.log(err);
        res.redirect('/error');
        
    }
}

exports.putEditSubCategory=async(req,res)=>{
    try{
        const _id=req.params.id;
        const {subCategoryName}=req.body;
        let error=await adminSubCategoryService.editSubCategory(_id,subCategoryName);
        if(error){
            req.flash('addSubCategoryError',error)
        }

        res.redirect('/admin/categories')
    }catch(err){
        console.log(err);
        res.redirect('/error');
    }
}

exports.deleteSubCategory=async (req,res)=>{
    try{
        let _id=req.params.id;
        await adminSubCategoryService.deleteSubCategory(_id);
        res.redirect('/admin/categories')
    }catch(err){
        console.log(err);
        res.redirect('/error');
        
    }
}




