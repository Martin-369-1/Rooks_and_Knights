//models
const orderCollection = require('../models/orderModel')
const addressCollection = require('../models/addressModel')

//list all orders
exports.viewOrders = async (currentPage, noOfList, skipPages) => {
    try {
        let totalNoOfList = await orderCollection.countDocuments()
        let orders = await orderCollection.find().sort({ createdAt: -1 }).skip(skipPages ).limit(noOfList ).populate('userID')
        return { orders, currentPage, totalNoOfList };
    } catch (err) {
        console.log(err);
    }
}

//get a specific order
exports.viewOrder = async (orderID) => {
    try {
        const order = await orderCollection.findById(orderID).populate('userID').populate('products.productID')

        return { order };
    } catch (err) {
        console.log(err);

    }
}

//change the productOrderStauts
exports.changeProductStatus = async (productOrderID, orderID, status) => {
    try {
        
        let order = await orderCollection.findOneAndUpdate(
            { _id: orderID, 'products._id': productOrderID },
            { $set: { 'products.$.status': status } },
            { new: true }
        );

        const allCanceled = order.products.every(product => product.status == 'canceled')
        const allDelivered = order.products.every(product => product.status == 'delivered')

        if (allCanceled) { //if all products are canceled
            order.orderStatus = 'canceled'
            await order.save()
        }

        if (allDelivered) { //if all products are delivered
            order.orderStatus = 'delivered'
            await order.save()
        }

    } catch (err) {
        console.log(err);
    }
}