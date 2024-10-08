//models
const productCollection = require('../models/productsModel');
const categoryCollection = require('../models/CategoryModel');
const subCategoryCollection = require('../models/subCategoryModel');

//requiring modules for saving the uploads
const fs = require('node:fs')
const path = require('node:path')


//get product list
exports.productList = async (search, currentPage, noOfList, skipPages) => {
    const findQuery = {};

    if (search) {
        findQuery.productName = {
            "$regex": new RegExp(search, 'i')
        }
    }

    try {
        const totalNoOfList = await productCollection.countDocuments()
        const productList = await productCollection.find(findQuery).skip(skipPages).limit(noOfList)
            .populate('categoryID')
            .populate('subCategoryID')
            .lean();

        return { productList, currentPage, totalNoOfList };
    } catch (err) {
        console.log(err);
    }
}

//add new product
exports.addProduct = async (req, res) => {

    try {
        const { productName, productDescription, productAbout, stock, price, category, subCategory, offer } = req.body;

        const product = await productCollection.findOne({ productName })

        if (product) { //check the product aldready exists
            return "Product Aldready exists"
        }

        const categoryID = await categoryCollection.findOne({ categoryName: category });
        const subCategoryID = await subCategoryCollection.findOne({ subCategoryName: subCategory });

        const newProduct = new productCollection({ //add new product
            productName,
            productAbout,
            productDescription,
            price,
            stock,
            categoryID,
            subCategoryID,
            offer,
            productImage1: `/public/upload/${req.files['img1'][0].filename}`,
            productImage2: `/public/upload/${req.files['img2'][0].filename}`,
            productImage3: `/public/upload/${req.files['img3'][0].filename}`,
        })

        await newProduct.save()

    } catch (err) {
        console.log(err);

    }
}

//view specif product
exports.viewProduct = async (productID) => {
    try {
        const product = await productCollection.findById(productID).populate('categoryID').populate('subCategoryID')

        return product;
    } catch (err) {
        console.log(err);

    }
}

//edit a product
exports.editProduct = async (req, res, productID) => {
    try {

        const { productName, productDescription, productAbout, stock, price, category, subCategory, offer } = req.body;

        const categoryID = await categoryCollection.findOne({ categoryName: category });
        const subCategoryID = await subCategoryCollection.findOne({ subCategoryName: subCategory });

        const oldProductData = await productCollection.findById(productID);

        let productImage1 = oldProductData.productImage1;
        let productImage2 = oldProductData.productImage2;
        let productImage3 = oldProductData.productImage3;

        //check the images are sent form frontend if there is no image the old image is taken
        if (req.files['img1']) {
            fs.unlink(path.join('./', productImage1), (err) => {
                if (err) {
                    console.log(err);;
                    return
                }
            })
            productImage1 = `/public/upload/${req.files['img1'][0].filename}`;
        }

        if (req.files['img2']) {
            fs.unlink(path.join('./', productImage2), (err) => {
                if (err) {
                    console.log(err);;
                    return
                }
            })
            productImage2 = `/public/upload/${req.files['img1'][0].filename}`;

        }

        if (req.files['img3']) {
            fs.unlink(path.join('./', productImage3), (err) => {
                if (err) {
                    console.log(err);;
                    return
                }
            })
            productImage3 = `/public/upload/${req.files['img1'][0].filename}`;

        }

        await productCollection.updateOne({ _id: productID }, {
            productName,
            productAbout,
            productDescription,
            price,
            stock,
            categoryID,
            subCategoryID,
            offer,
            productImage1,
            productImage2,
            productImage3,
        })


    } catch (err) {
        console.log(err);
    }
}

//delete a product
exports.listUnlistProduct = async (productID, list) => {
    try {
        await productCollection.updateOne({ _id: productID }, { isListed: list })

    } catch (err) {
        console.log(err);
    }
}

//get cateogry list
exports.categories = async () => {
    try {
        const categories = await categoryCollection.find({ isListed: true });

        return categories;
    } catch (err) {
        console.log(err);
    }
}

//get subcategory list
exports.subCategories = async () => {
    try {
        const subCategories = await subCategoryCollection.find({ isListed: true });
        return subCategories;
    } catch (err) {
        console.log(err);
    }
}
