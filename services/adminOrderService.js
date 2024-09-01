const orderCollection=require('../models/orderModel')

exports.viewOrders=async(req,res)=>{
    try{
        let orders=await orderCollection.find().sort({createdAt:-1}).populate('userID')
        return orders
    }catch(err){
        console.log(err);
    }
}