const categoryCollection=require('../models/CategoryModel')
const productCollection=require('../models/productsModel')

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
            let oldCategory=await categoryCollection.findOneAndUpdate({categoryName},{$set:{isDeleted:false}})
            await productCollection.updateMany({categoryID:oldCategory._id},{isListed:true})
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

exports.editCategory=async(_id,categoryName)=>{
    try{
        let category=await categoryCollection.findOne({categoryName})
        if(category){
            return "category already exists cannot edit"
        }
        await categoryCollection.updateOne({_id},{categoryName})
    }catch(err){
        console.log(err);
        
    }
}

exports.deleteCategory=async(_id)=>{
    try{
        await categoryCollection.updateOne({_id},{isDeleted:true})
        await productCollection.updateMany({categoryID:_id},{$set:{isListed:false}})
    }catch(err){

    }
}