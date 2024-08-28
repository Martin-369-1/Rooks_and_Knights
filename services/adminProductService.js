const productCollection=require('../models/productsModel');
const categoryCollection=require('../models/CategoryModel');
const subCategoryCollection=require('../models/subCategoryModel');
const fs=require('node:fs')
const path=require('node:path')
const mongoose=require('mongoose');

const upload=require('../utils/multerUtils')

exports.productList=async()=>{
    try{
        const productList = await productCollection.find({ isDeleted: false})
  .populate({
    path: 'categoryID',
    select: 'categoryName' 
  })
  .populate({
    path: 'subCategoryID',
    select: 'subCategoryName' 
  })
  .lean();
        return productList;
    }catch(err){
        console.log(err);  
    }
}


exports.addProduct=async(req,res)=>{    
    
    try{ 
        const {productName,productDescription,productAbout,stock,price,category,subCategory,offers}=req.body;
        
        const product=await productCollection.findOne({productName})

        if(product){
            return "Product Aldready exists"
        }

        const categoryID=await categoryCollection.findOne({categoryName:category});
        const subCategoryID=await subCategoryCollection.findOne({subCategoryName:subCategory});

        const newProduct=new productCollection({
            productName,
            productAbout,
            productDescription,
            price,
            stock,
            categoryID,
            subCategoryID,
            offers,
            productImage1:`/public/upload/${req.files['img1'][0].filename}`,
            productImage2:`/public/upload/${req.files['img2'][0].filename}`,
            productImage3:`/public/upload/${req.files['img3'][0].filename}`,
        })

        await newProduct.save()

    }catch(err){
        console.log(err);
        
    }
}

exports.viewProduct=async(_id)=>{
    try{
        const product = await productCollection.findById(_id)
        .populate({
            path: 'categoryID subCategoryID', // Populate both fields at once
            select: 'categoryName subCategoryName', // Select relevant fields from both collections
        })
        .select({
            _id: 1,
            productName: 1,
            productDescription: 1,
            price: 1,
            productAbout: 1,
            stock: 1,
            noOfOrders: 1,
            productImage1: 1,
            productImage2: 1,
            productImage3: 1,
            offers: 1
        })
        .exec();
       
        return product;
    }catch(err){
        console.log(err);
        
    }
}

exports.editProduct=async(req,res,_id)=>{
    try{
        
        const {productName,productDescription,productAbout,stock,price,category,subCategory,offers}=req.body;
        
        const categoryID=await categoryCollection.findOne({categoryName:category});
        const subCategoryID=await subCategoryCollection.findOne({subCategoryName:subCategory});

        const oldProductData = await productCollection.findById(_id);
        

        let productImage1 = oldProductData.productImage1;
        let productImage2 = oldProductData.productImage2;
        let productImage3 = oldProductData.productImage3;

        
        if (req.files['img1']) {
            fs.unlink(path.join('./',productImage1),(err)=>{
                if(err){
                    console.log(err);;
                    return         
                }
            })
            productImage1 = `/public/upload/${req.files['img1'][0].filename}`;
            
            
        }
        if (req.files['img2']) {
            fs.unlink(path.join('./',productImage2),(err)=>{
                if(err){
                    console.log(err);;
                    return         
                }
            })
            productImage2 = `/public/upload/${req.files['img1'][0].filename}`;
          
        }
        if (req.files['img3']) {
            fs.unlink(path.join('./',productImage3),(err)=>{
                if(err){
                    console.log(err);;
                    return         
                }
            })
            productImage3 = `/public/upload/${req.files['img1'][0].filename}`;

        }

        await productCollection.updateOne({_id},{
            productName,
            productAbout,
            productDescription,
            price,
            stock,
            categoryID,
            subCategoryID,
            offers,
            productImage1,
            productImage2,
            productImage3,
        })


    }catch(err){
        console.log(err);
        
    }
}

exports.deleteProduct=async(_id)=>{
    try{
        await productCollection.updateOne({_id},{isDeleted:true})
    }catch(err){
        console.log(err);       
    }
}

exports.categories=async()=>{
    try{
        let categories=await categoryCollection.find({isDeleted:false},{_id:0,categoryName:1});
        return categories;
    }catch(err){
        console.log(err);    
    }
}

exports.subCategories=async()=>{
    try{
        let subCategories=await subCategoryCollection.find({isDeleted:false},{_id:0,subCategoryName:1});
        return subCategories;
    }catch(err){
        console.log(err);    
    } 
}
