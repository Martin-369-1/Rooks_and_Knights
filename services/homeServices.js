const productCollection=require('../models/productsModel')
const categoryCollection=require('../models/CategoryModel')
const subCategoryCollection=require('../models/subCategoryModel')

exports.index=async()=>{
    try{
        let categories=await categoryCollection.find({isDeleted:false})
        let topProductList=await productCollection.find({isDeleted:false}).sort({noOfOrders:-1}).limit(8);
        return {categories,topProductList};
    }catch(err){
        console.log(err);        
    }
}

