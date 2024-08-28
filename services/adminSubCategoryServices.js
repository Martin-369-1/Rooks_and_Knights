const subCategoryCollection=require('../models/subCategoryModel')
const productCollection=require('../models/productsModel')

exports.subCategoryList=async()=>{
    try{
        let subCategoryList=await subCategoryCollection.find({isDeleted:false},{_id:1,subCategoryName:1,subCategoryDescription:1})

        return subCategoryList;
    }catch(err){
        console.log(err);
        
    }
}


exports.addSubCategory=async (subCategoryName,subCategoryDescription)=>{
    try{
        let subCategory=await subCategoryCollection.findOne({subCategoryName});
                
        if(subCategory){
            if(!subCategory.isDeleted){

                return "subCategory Aldready exists"
            }
            let oldsubCategory=await subCategoryCollection.findOneAndUpdate({subCategoryName},{$set:{isDeleted:false}})
                return null
        }
        const newsubCategory=new subCategoryCollection({
            subCategoryName,
            subCategoryDescription
        })

        await newsubCategory.save();

    }catch(err){
        console.log(err);
        
    }
}

exports.editSubCategory=async(_id,subCategoryName,subCategoryDescription)=>{
    try{
        let subCategory=await subCategoryCollection.findOne({subCategoryName,_id:{$ne:{_id}}})
        if(subCategory){
            return "subCategory already exists cannot edit"
        }
        await subCategoryCollection.updateOne({_id},{subCategoryName,subCategoryDescription})
    }catch(err){
        console.log(err);
        
    }
}

exports.deleteSubCategory=async(_id)=>{
    try{
        const productExist=await productCollection.findOne({subCategoryID:_id})
        if(productExist){
            return "SubCategories with products cannot be deleted"
        }
        await subCategoryCollection.updateOne({_id},{isDeleted:true})
        
    }catch(err){

    }
}