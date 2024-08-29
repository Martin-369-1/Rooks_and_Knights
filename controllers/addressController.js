//services
const addressService=require('../services/addressServices');

exports.postNewAddress=async(req,res)=>{
    try{
        const {addressTitle,state,city,pinCode,streetAddress}=req.body;
        await addressService.addNewAddress(addressTitle,state,city,pinCode,streetAddress,req.userID)
        res.status(200).json({success:true})
    }catch(err){
        console.log(err);
        
    }
}

exports.deleteAddress=async(req,res)=>{
    try{  
        const _id=req.params.id;
        await addressService.deleteAddress(_id,req.userID)
        res.status(200).json({success:true})
    }catch(err){
        console.log(err);  
    }
}

exports.putAddress=async(req,res)=>{
    try{  
        const {addressTitle,state,city,pinCode,streetAddress}=req.body;
        const _id=req.params.id;
        console.log(_id);
        
        await addressService.editAddress(addressTitle,state,city,pinCode,streetAddress,_id,req.userID)
        res.status(200).json({success:true})
    }catch(err){
        console.log(err);  
    }
}