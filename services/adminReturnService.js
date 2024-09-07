const orderCollection=require('../models/orderModel')

exports.returnsList=async()=>{
    try{
        const returnList = await orderCollection.find({
            'products.returnStatus': { $ne: 'notRequested' }
          }).sort({createdAt:-1}).populate('userID').populate('products.productID')

        return returnList;

    }catch(err){
        console.log(err);
        
    }
}