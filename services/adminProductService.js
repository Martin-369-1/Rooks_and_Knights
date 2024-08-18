const productCollection=require('../models/productsModel');
const categoryCollection=require('../models/CategoryModel');
const subCategoryCollection=require('../models/subCategoryModel');
const fs=require('node:fs')
const mongoose=require('mongoose');

const upload=require('../utils/multerUtils')

const productListQueiry=[{
    $match: {
      isDeleted:false
    }
  },
  {
    $lookup: {
      from: 'categories',
      localField: 'categoryID',
      foreignField: '_id',
      as: 'category'
    }
  },
   {$unwind:'$category'},
   {
    $lookup: {
      from: 'subcategories',
      localField: 'subCategoryID',
      foreignField: '_id',
      as: 'subCategory'
    }
  },
   {$unwind:'$subCategory'},
   {$project: {
     _id:1,
     productName:1,
     price:1,
     stock:1,
     category:"$category.categoryName",
     subCategory:"$subCategory.subCategoryName"
   }}
  ]

const productViewQueiry=function(_id){
    return [{
        $match: {
          _id:new mongoose.Types.ObjectId(_id),
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryID',
          foreignField: '_id',
          as: 'category'
        }
      },
       {$unwind:'$category'},
       {
        $lookup: {
          from: 'subcategories',
          localField: 'subCategoryID',
          foreignField: '_id',
          as: 'subCategory'
        }
      },
       {$unwind:'$subCategory'},
       {$project: {
         _id:1,
         productName:1,
         productDescription:1,
         price:1,
         productAbout:1,
         stock:1,
         noOfOrders:1,
         productImage1:1,
         productImage2:1,
         productImage3:1,
         offers:1,
         category:"$category.categoryName",
         subCategory:"$subCategory.subCategoryName"
       }}
    ]
      
}



exports.productList=async()=>{
    try{
        let productList=await productCollection.aggregate(productListQueiry);       
        return productList;
    }catch(err){
        console.log(err);  
    }
}


exports.addProduct=async(req,res)=>{    
    
    try{
        
        const {productName,productDescription,productAbout,stock,price,category,subCategory,offer}=req.body;
        
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
            offer,
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
        const queiry=productViewQueiry(_id)
        const product=await productCollection.aggregate(queiry)
        
        return product;
    }catch(err){
        console.log(err);
        
    }
}

exports.editProduct=async(req,res,_id)=>{
    console.log(req.body);
    try{
        console.log(req.body);
        
        const {productName,productDescription,productAbout,stock,price,category,subCategory,offer}=req.body;
        
        const categoryID=await categoryCollection.findOne({categoryName:category});
        const subCategoryID=await subCategoryCollection.findOne({subCategoryName:subCategory});

        const oldProductData = await productCollection.findById(_id);
        

        let productImage1 = oldProductData.productImage1;
        let productImage2 = oldProductData.productImage2;
        let productImage3 = oldProductData.productImage3;

        if (req.files['img1']) {
            productImage1 = `/upload/${req.files['img1'][0].filename}`;
            fs.unlink(oldProductData.productImage1)
        }
        if (req.files['img2']) {
            productImage2 = `/upload/${req.files['img2'][0].filename}`;
            fs.unlink(oldProductData.productImage2)
        }
        if (req.files['img3']) {
            productImage3 = `/upload/${req.files['img3'][0].filename}`;
            fs.unlink(oldProductData.productImage3)
        }

        await productCollection.updateOne({_id},{
            productName,
            productAbout,
            productDescription,
            price,
            stock,
            categoryID,
            subCategoryID,
            offer,
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
