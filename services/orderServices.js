const orderCollection=require('../models/orderModel')
const cartCollection=require('../models/cartModel')

exports.createOrder=async(products,addressId,paymentMethod,subTotalAmmount,totalAmmount,userID)=>{
    try{
        console.log("dsjkdalsij ",totalAmmount);
        const newOrder=new orderCollection({
            userID,
            addressId,
            products,
            paymentMethod,
            subTotalAmmount,
            totalAmmount
        })
        await newOrder.save()

    }catch(err){
        console.log(err);
        
    }
}

exports.viewOrders=async(userID)=>{
    try{
        let orders=await orderCollection.find({userID}).sort({createdAt:-1}).populate('products.productID')
        return orders;
    }catch(err){
        console.log(err);
        
    }
}

exports.cancelOrders=async(_id,userID)=>{
    try{
        let order=await orderCollection.findOneAndUpdate(
            { userID, 'products._id': _id },
            { $set: { 'products.$.status': 'canceled' } },
            { new: true }
          );
          
        const allCanceled = order.products.every(product => product.status === 'canceled');
        
        
        if(allCanceled){
            order.orderStatus='canceled'
            await order.save()
        }
    }catch(err){
        console.log(err);
        
    }
}