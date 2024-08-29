//models
const address = require('../models/addressModel');
const addressCollection=require('../models/addressModel')

exports.addNewAddress=async(addressTitle,state,city,pinCode,streetAddress,userID)=>{
    try{
        const address=await addressCollection.findOne({userID})
        console.log(address);
        
        if(!address){
            const newaddress=new addressCollection({
                userID,
                address:[{
                    addressTitle,
                    state,
                    city,
                    pinCode,
                    streetAddress
                }]
            })

            return newaddress.save()
        }
        
        address.address.push({addressTitle,state,city,pinCode,streetAddress})

        await address.save()
    }catch(err){
        console.log(err);  
    }
}

exports.viewAddress=async(userID)=>{
    try{
        const address=await addressCollection.findOne({userID})

        if(!address){
            const newaddress=new addressCollection({
                userID,
                address:[]
            })

            await newaddress.save()
            return newaddress;
        }

        return address
    }catch(err){
        console.log(err);
        
    }
} 

exports.deleteAddress=async(_id,userID)=>{
    try{
        await addressCollection.updateOne({userID},{$pull:{address:{_id}}})
    }catch(err){
        console.log(err);
    }
}

exports.editAddress=async(addressTitle,state,city,pinCode,streetAddress,_id,userID)=>{
    try{
 
        await addressCollection.updateOne(
            { userID:userID, 'address._id': _id},
            { $set: { 'address.$.addressTitle': addressTitle, 'address.$.state': state, 'address.$.city': city, 'address.$.pinCode': pinCode,
                'address.$.streetAddress': streetAddress}}
          );

    }catch(err){
        console.log(err);
        
    }
}