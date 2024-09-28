//models
const productCollection = require('../models/productsModel');
const categoryCollection = require('../models/CategoryModel');
const subCategoryCollection = require('../models/subCategoryModel');


exports.displayOffers = async (search) => {
    try {

        const productList = await productCollection.find({ isListed: true, productName: { $regex: new RegExp(search, 'i') } })
        const categoryList = await categoryCollection.find({ isListed: true, categoryName: { $regex: new RegExp(search, 'i') } })
        const subCategoryList = await subCategoryCollection.find({ isListed: true, subCategoryName: { $regex: new RegExp(search, 'i') } });

        return { productList, categoryList, subCategoryList }
    } catch (err) {
        console.log(err);
    }
}

exports.addOffer = async (type, ID, offer) => {
    try {
        if (type == 'product') {
            await productCollection.updateOne({ _id: ID }, { offer })
        } else if (type == 'category') {
            await categoryCollection.updateOne({ _id: ID }, { offer })
        } else if (type == 'subCategory') {
            await subCategoryCollection.updateOne({ _id: ID }, { offer })
        }

    } catch (err) {
        console.log(err);

    }
}

exports.deleteOffer = async (type, ID) => {
    try {
        if (type == 'product') {
            await productCollection.updateOne({ _id: ID }, { offer: 0 })
        } else if (type == 'category') {
            await categoryCollection.updateOne({ _id: ID }, { offer: 0 })
        } else if (type == 'subCategory') {
            await subCategoryCollection.updateOne({ _id: ID }, { offer: 0 })
        }
    } catch (err) {
        console.log(err)
    }
}
