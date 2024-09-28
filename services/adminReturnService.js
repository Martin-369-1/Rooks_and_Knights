const orderCollection = require('../models/orderModel')

exports.returnsList = async (currentPage, noOfList, skipPages) => {
    try {
        const totalNoOfList = await orderCollection.countDocuments({ 'products.returnStatus': { $ne: 'notRequested' } })

        const returnList = await orderCollection.find({ 'products.returnStatus': { $ne: 'notRequested' } })
            .sort({ createdAt: -1 }).skip(skipPages).limit(noOfList)
            .populate('userID').populate('products.productID')

        return { returnList, currentPage, totalNoOfList };

    } catch (err) {
        console.log(err);

    }
}

exports.aproveRejectReturn = async (orderID, orderItemID, returnStatus) => {
    try {
        await orderCollection.updateOne({ _id: orderID, 'products._id': orderItemID }, { 'products.$.returnStatus': returnStatus })

    } catch (err) {
        console.log(err);

    }
}