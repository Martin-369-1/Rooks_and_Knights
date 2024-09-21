const orderCollection = require('../models/orderModel');
const productCollection = require('../models/productsModel');
const addressCollection = require('../models/addressModel')
const categoryCollection = require('../models/CategoryModel')
const subCategoryCollection=require('../models/subCategoryModel')

exports.createOrder = async (products, addressId, paymentMethod, basePrice, totalAmmount,discount,taxAmmount, userID) => {
    try {
        const newOrder = new orderCollection({
            userID,
            addressId,
            products,
            paymentMethod,
            basePrice,
            totalAmmount,
            discount,
            taxAmmount
        })

        for (const product of products) {
            const productDetails= await productCollection.findOneAndUpdate(
                { _id: product.productID },
                { $inc: { stock: -product.quantity, noOfOrders: 1 } },

            );

            await categoryCollection.updateOne({_id:productDetails.categoryID},{$inc:{noOfOrders:1}})
            await subCategoryCollection.updateOne({_id:productDetails.subCategoryID},{$inc:{noOfOrders:1}})
        }

        await newOrder.save()
        return newOrder;

    } catch (err) {
        console.log(err);
    }
}

exports.completePayment = async (orderID) => {
    try {
        await orderCollection.updateOne({ _id: orderID }, { paymentStatus: 'completed' })
    } catch (err) {
        console.log(err);
    }
}

exports.viewOrders = async (userID) => {
    try {
        let orders = await orderCollection.find({ userID }).sort({ createdAt: -1 }).populate('products.productID')
        return orders;
    } catch (err) {
        console.log(err);

    }
}

exports.getOrder=async(orderID)=>{
    try{
        const order=await orderCollection.findOne({_id:orderID}).populate('userID').populate('products.productID')

        const address=(await addressCollection.findOne({'address._id':order.addressId})).address[0]
        console.log(address);
        
        
        return {order,address};
    }catch(err){
        console.log(err);  
    }
}

exports.cancelOrders = async (_id, userID, productID, productQuantity) => {
    try {

        let order = await orderCollection.findOneAndUpdate(
            { userID, 'products._id': _id },
            { $set: { 'products.$.status': 'canceled' } },
            { new: true }
        )

        await productCollection.updateOne({ _id: productID }, { $inc: { stock: productQuantity } })
        const allCanceled = order.products.every(product => product.status === 'canceled');


        if (allCanceled) {
            order.orderStatus = 'canceled'
            await order.save()
        }

        return order.paymentMethod;

    } catch (err) {
        console.log(err);

    }
}

exports.returnOrders = async (userID, orderProductId, returnReason) => {
    try {
        console.log(orderProductId);

        await orderCollection.updateOne(
            { userID, 'products._id': orderProductId },
            { $set: { 'products.$.returnStatus': 'requested', 'products.$.returnReason': returnReason } },
        );


    } catch (err) {
        console.log(err);
    }
}