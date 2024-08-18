const categoryCollection=require('../models/CategoryModel')

exports.categoryList=async()=>{
    try{
        let categoryList=await categoryCollection.find({isDeleted:false},{_id:1,categoryName:1})
        return categoryList;
    }catch(err){
        console.log(err);
        
    }
}


exports.addCategory=async (categoryName)=>{
    try{
        let category=await categoryCollection.findOne({categoryName});        
        if(category){
            if(!category.isDeleted){

                return "category Aldready exists"
            }
            await categoryCollection.updateOne({categoryName},{$set:{isDeleted:false}})
                return null
        }
        const newCategory=new categoryCollection({
            categoryName
        })

        await newCategory.save();

    }catch(err){
        console.log(err);
        
    }
}

exports.deleteCategory=async(_id)=>{
    try{
        await categoryCollection.updateOne({_id},{isDeleted:true})
    }catch(err){

    }
}