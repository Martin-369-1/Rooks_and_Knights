const orderCollection=require('../models/orderModel')
const addressCollection=require('../models/addressModel')
const productsCollection=require('../models/productsModel')
const userCollection=require('../models/userModel')
const address = require('../models/addressModel')

exports.viewOrders=async(currentPage,noOfList,skipPages)=>{
    try{
        let totalNoOfList = await orderCollection.countDocuments({ isDeleted: false })
        let orders=await orderCollection.find().sort({createdAt:-1}).skip(skipPages * noOfList).limit(currentPage * noOfList).populate('userID')
        return {orders,currentPage,totalNoOfList};
    }catch(err){
        console.log(err);
    }
}

exports.viewOrder=async(_id)=>{
    try{
        const order=await orderCollection.findById(_id).populate('userID').populate('products.productID')
        const address = (await addressCollection.findOne({userID:order.userID._id , "address._id":order.addressId })).address[0];
        console.log(address);
        
        
        return {order,address};
    }catch(err){
        console.log(err);
        
    }
}

exports.changeProductStatus=async(_id,orderID,status)=>{
    try{
        console.log(typeof(status));
        
        let order=await orderCollection.findOneAndUpdate(
            { _id: orderID, 'products._id': _id }, 
            { $set: { 'products.$.status': status } },
            {new:true}
          );

        const allCanceled=order.products.every(product => product.status=='canceled')
        const allDelivered=order.products.every(product => product.status=='delivered')

        if(allCanceled){
            order.orderStatus='canceled'
            await order.save()
        }

        if(allDelivered){
            order.orderStatus='delivered'
            await order.save()
        }

    }catch(err){
        console.log(err);
        
    }
}