const orderCollection = require('../models/orderModel');
const productCollection = require('../models/productsModel');

exports.createOrder = async (products, addressId, paymentMethod, subTotalAmmount, totalAmmount, userID) => {
    try {
        const newOrder = new orderCollection({
            userID,
            addressId,
            products,
            paymentMethod,
            subTotalAmmount,
            totalAmmount,
        })

        for (const product of products) {
            await productCollection.updateMany(
                { _id: product.productID },
                { $inc: { stock: -product.quantity, noOfOrders: 1 } }, // Decrease stock
            );
        }

        await newOrder.save()
        return newOrder;

    } catch (err) {
        console.log(err);
    }
}

exports.completePayment = async (orderID) => {
    try {
        await orderCollection.updateOne({ _id: orderID }, { paymentStatus: true })
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
        let myorder = await orderCollection.findOne({ userID, _id: '66db1302d1441e3f0f2eb12f' })
        console.log(myorder.products);


    } catch (err) {
        console.log(err);
    }
}