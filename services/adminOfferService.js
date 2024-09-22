//models
const productCollection=require('../models/productsModel');
const categoryCollection=require('../models/CategoryModel');
const subCategoryCollection=require('../models/subCategoryModel');
const offerCollection=require('../models/offerModel');
const { sub } = require('date-fns');

exports.displayOffers=async(search)=>{
    try{
        const offerList=await offerCollection.find({offerName:{$regex: new RegExp(search, 'i')}})
                        .populate('applicableProducts.productID').populate('applicableCategories.categoryID').populate('applicableSubCategoreis.subCategoryID')
        
        const productsList=await productCollection.find({isDeleted:false})
        const categoryList=await categoryCollection.find({isDeleted:false})
        const subCategoryList=await subCategoryCollection.find({isDeleted:false})

        return {offerList,productsList,categoryList,subCategoryList}
    }catch(err){
        console.log(err);
    }
}

exports.addOffer=async(type,ID,offer)=>{
    try{
        if(type == 'product'){
            await productCollection.updateOne({_id:ID},{offer})
        }else if(type == 'category'){
            await categoryCollection.updateOne({_id:ID},{offer})
        }else if(type == 'subCategory'){
            await subCategoryCollection.updateOne({_id:ID},{offer})
        }

    }catch(err){
        console.log(err);
        
    }
}

exports.deleteOffer=async(type,ID)=>{
    try{
        if(type == 'product'){
            await productCollection.updateOne({_id:ID},{offer:0})
        }else if(type == 'category'){
            await productCollection.updateMany({categoryID:ID},{offer:0})
        }else if(type == 'subCategory'){
            await subCategoryCollection.updateOne({_id:ID},{offer:0})
        }
    }catch(err){
        console.log(err)
    }
}
