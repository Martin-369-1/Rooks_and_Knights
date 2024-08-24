const productCollection=require('../models/productsModel')
const categoryCollection=require('../models/CategoryModel')
const subCategoryCollection=require('../models/subCategoryModel')

exports.index=async()=>{
    try{
        let categories=await categoryCollection.find({isDeleted:false})
        let topProductList=await productCollection.find({isDeleted:false},{_id:1,productName:1,price:1,productImage1:1}).sort({noOfOrders:-1});
        return {categories,topProductList};
    }catch(err){
        console.log(err);        
    }
}

exports.viewProduct=async(_id)=>{
    
    try{
        const product = await productCollection.findById(_id)
        .populate({
          path: 'categoryID',   
          select: 'categoryName' 
        })
        .populate({
          path: 'subCategoryID', 
          select: 'subCategoryName' 
        })
        .select({
          _id: 1,
          productName: 1,
          productDescription: 1,
          price: 1,
          productAbout: 1,
          stock: 1,
          productImage1: 1,
          productImage2: 1,
          productImage3: 1,
          offers: 1,
          reviews:1,
          stock:1,
          categoryID:1,
          subCategoryID:1
        })
        .exec();

      
      const relatedProducts=await productCollection.find({isDeleted:false,categoryID:product.categoryID._id,_id:{$ne:product._id}},{_id:1,productName:1,price:1,productImage1:1})
      console.log(relatedProducts);
      
       
      return {product,relatedProducts};
    }catch(err){
        console.log(err);
        
    }
}