const productCollection = require('../models/productsModel');
const categoryCollection = require('../models/CategoryModel');
const subCategoryCollection = require('../models/subCategoryModel');
const userCollection = require('../models/userModel')
const { objectID } = require('mongoose')

exports.productList = async (categoryID, sortby, price, subCategoryID, search, currentPage, noOfProducts, skipPages) => {
    let findQuery = { isDeleted: false };
    if (categoryID) {
        findQuery.categoryID = categoryID;
    }

    if (subCategoryID) {
        findQuery.subCategoryID = subCategoryID;
    }

    if (search) {
        findQuery.productName = {
            "$regex": new RegExp(search, 'i') // Partial match with case-insensitivity
        };
    }


    switch (price) {
        case "0-1000":
            findQuery.price = { "$gte": 0, "$lt": 1000 };
            break;
        case "1000-2000":
            findQuery.price = { "$gte": 1000, "$lt": 2000 };
            break;
        case "2000-3000":
            findQuery.price = { "$gte": 2000, "$lt": 3000 };
            break;
        case "3000-4000":
            findQuery.price = { "$gte": 3000, "$lt": 4000 };
            break;
        case "4000+":
            findQuery.price = { "$gte": 4000 };
            break;
    }

    let sortQuery = {};
    switch (sortby) {
        case "newArrivals":
            sortQuery.createdAt = -1;
            break;
        case "priceLowToHeigh":
            sortQuery.price = 1;
            break;
        case "priceHeighToLow":
            sortQuery.price = -1;
            break;
        case "aA-zZ":
            sortQuery.productName = 1;
            break;
        case "zZ-aA":
            sortQuery.productName = -1;
            break;

    }

    try {
        let categoryList = await categoryCollection.find({ isDeleted: false })
        let subCategoryList = await subCategoryCollection.find({ isDeleted: false })
        let totalNoOfProducts = await productCollection.countDocuments({ isDeleted: false })
        let productList = await productCollection.find(findQuery).collation({ locale: 'en', strength: 2 }).sort(sortQuery).skip(skipPages * noOfProducts).limit(currentPage * noOfProducts);
        return { productList, categoryList, subCategoryList, totalNoOfProducts };
    } catch (err) {
        console.log(err);

    }
}


exports.viewProduct = async (_id) => {

    try {
        const product = await productCollection.findById(_id)
            .populate({
                path: 'categoryID',
                select: 'categoryName'
            })
            .populate({
                path: 'subCategoryID',
                select: 'subCategoryName'
            })
            .populate({
                path: 'reviews.userID',
            })
            .exec();

        const relatedProducts = await productCollection.find({ isDeleted: false, categoryID: product.categoryID._id, _id: { $ne: product._id } })


        return { product, relatedProducts };
    } catch (err) {
        console.log(err);

    }
}


exports.addReview = async (_id, newReview) => {
    try {
        await productCollection.updateOne({ _id }, { $push: { reviews: newReview } });
    } catch (err) {
        console.log(err);
    }

}