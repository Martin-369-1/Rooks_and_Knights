const productCollection = require('../models/productsModel')
const categoryCollection = require('../models/CategoryModel')
const subCategoryCollection = require('../models/subCategoryModel')

exports.index = async () => {
    try {
        let categories = await categoryCollection.find({ isListed: true })
        let topProductList = await productCollection.find({ isListed: true }).populate('categoryID').populate('subCategoryID').sort({ noOfOrders: -1 }).limit(8)
        

        return { categories, topProductList };
    } catch (err) {
        console.log(err);
    }
}

