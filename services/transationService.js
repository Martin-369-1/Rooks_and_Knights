//models
const transationCollection = require('../models/transationModel')

exports.transationsList = async (userID) => {
    try {
        const transationList = await transationCollection.find({ userID }).sort({ createdAt: -1 })
        return transationList;
    } catch (err) {
        console.log(err);
    }
}

exports.allTransationsList = async (currentPage, noOfList, skipPages) => {
    try {
        const totalNoOfList = await transationCollection.countDocuments()

        const transationList = await transationCollection.find().sort({ createdAt: -1 })
            .skip(skipPages * noOfList).limit(currentPage * noOfList).populate('userID')
        
            console.log(transationList);
            
        return { transationList, currentPage, totalNoOfList };
    } catch (err) {
        console.log(err);
    }
}

exports.completeTransation = async (userID, amount, transationType, paymentMethod) => {
    try {
        const newTransation = new transationCollection({
            userID, amount, transationType, paymentMethod
        })

        await newTransation.save()
    } catch (err) {
        console.log(err);

    }
}