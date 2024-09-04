//models
const categoryCollection = require('../models/CategoryModel')
const productCollection = require('../models/productsModel')


exports.categoryList = async (search,currentPage,noOfList,skipPages) => {
    let findQuery = { isDeleted: false };

    if (search) {
        findQuery.categoryName={
             "$regex": new RegExp(search, 'i') 
        }
    }
    try {
        let totalNoOfList = await categoryCollection.countDocuments({ isDeleted: false })
        let categoryList = await categoryCollection.find(findQuery).skip(skipPages * noOfList).limit(currentPage * noOfList)

        return {categoryList,currentPage,totalNoOfList};
    } catch (err) {
        console.log(err);

    }
}

exports.addCategory = async (categoryName, categoryDescription) => {
    try {
        let category = await categoryCollection.findOne({ categoryName });

        if (category) {
            if (!category.isDeleted) {

                return "category Aldready exists"
            }
            let oldCategory = await categoryCollection.findOneAndUpdate({ categoryName }, { $set: { isDeleted: false } })
            return
        }
        const newCategory = new categoryCollection({
            categoryName,
            categoryDescription
        })

        await newCategory.save();

    } catch (err) {
        console.log(err);

    }
}

exports.editCategory = async (_id, categoryName, categoryDescription) => {
    try {
        let category = await categoryCollection.findOne({ categoryName, _id: { $ne: _id } })
        if (category) {
            return "category already exists cannot edit"
        }

        await categoryCollection.updateOne({ _id }, { categoryName, categoryDescription })
    } catch (err) {
        console.log(err);

    }
}

exports.deleteCategory = async (_id) => {
    try {
        const productsExists = await productCollection.findOne({ categoryID: _id })
        if (productsExists) {
            return "Categories with products cannot delete"
        }
        await categoryCollection.updateOne({ _id }, { isDeleted: true })
    } catch (err) {

    }
}