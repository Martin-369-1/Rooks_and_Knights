const subCategoryCollection=require('../models/subCategoryModel')
const productCollection=require('../models/productsModel')

exports.subCategoryList=async()=>{
    try{
        let subCategoryList=await subCategoryCollection.find({isDeleted:false},{_id:1,subCategoryName:1})

        return subCategoryList;
    }catch(err){
        console.log(err);
        
    }
}


exports.addSubCategory=async (subCategoryName)=>{
    try{
        let subCategory=await subCategoryCollection.findOne({subCategoryName});
                
        if(subCategory){
            if(!subCategory.isDeleted){

                return "subCategory Aldready exists"
            }
            let oldsubCategory=await subCategoryCollection.findOneAndUpdate({subCategoryName},{$set:{isDeleted:false}})
            await productCollection.updateMany({subCategoryID:oldsubCategory._id},{isListed:true})
                return null
        }
        const newsubCategory=new subCategoryCollection({
            subCategoryName
        })

        await newsubCategory.save();

    }catch(err){
        console.log(err);
        
    }
}

exports.editSubCategory=async(_id,subCategoryName)=>{
    try{
        let subCategory=await subCategoryCollection.findOne({subCategoryName})
        if(subCategory){
            return "subCategory already exists cannot edit"
        }
        await subCategoryCollection.updateOne({_id},{subCategoryName})
    }catch(err){
        console.log(err);
        
    }
}

exports.deleteSubCategory=async(_id)=>{
    try{
        await subCategoryCollection.updateOne({_id},{isDeleted:true})
        await productCollection.updateMany({subCategoryID:_id},{$set:{isListed:false}})
    }catch(err){

    }
}