const userCollection=require('../models/userModel')

exports.userList=async ()=>{
    try{
        let userList=await userCollection.find({isAdmin:false},{_id:1,username:1,email:1,isblocked:1});
        return userList;
    }catch(err){
        console.log(err);
        
    }
}

exports.blockUnblockUser=async (_id)=>{
    try{
        let userdata=await userCollection.findOne({_id})

        if(userdata){
            await userCollection.updateOne({_id},{$set:{isblocked:!userdata.isblocked}})
        }else{
            console.log("user not found");
            
        }
        
    }catch(err){
        console.log(err);
        
    }
}