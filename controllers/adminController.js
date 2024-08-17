const adminUserService=require('../services/adminUserService')
const adminCategoryService=require('../services/adminCategoryService')


exports.getUsers=async (req,res)=>{
    try{
        let userList=await adminUserService.userList();
        res.render('admin/users.ejs',{userList})
    }catch(err){
        console.log(err);      
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
        
    }
}


exports.getProducts=async(req,res)=>{
    res.render('admin/products')
}

exports.addProduct=async (req,res)=>{
    res.render('admin/addProduct')
}

exports.getCategories=async (req,res)=>{
    try{
        let categoryList=await adminCategoryService.categoryList();
        res.render('admin/categories',{categoryList,error:req.flash('addCategoryError') || ''})
    }catch(err){
        console.log(err);
        
    }
    
}

exports.deleteCategory=async (req,res)=>{
    try{
        let _id=req.params.id;
        await adminCategoryService.deleteCategory(_id);
        res.redirect('/admin/categories')
    }catch(err){
        console.log(err);
        
    }
}

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
        
    }
}

exports.getProducts=async (req,res)=>{
    res.render('admin/products')
}

