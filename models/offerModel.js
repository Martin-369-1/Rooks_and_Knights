const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const offerSchema = Schema({
    offerName: {
        type: String,
        required: true
    },
    offerPercentage: {
        type: Number,
        reqired: true,
        default: 0
    },
    expiryDate: {
        type: Date,
        required: true
    },
    applicableProducts: [
        {
            productID: {
                type: mongoose.Types.ObjectId,
                ref: 'products'
            }
        }
    ],
    applicableCategories: [
        {
            categoryID: {
                type: mongoose.Types.ObjectId,
                ref: 'categories'
            }
        }
    ],
    applicableSubCategories: [
        {
            subCategoryID: {
                type: mongoose.Types.ObjectId,
                ref: 'subCategories'
            }
        }
    ]

}, { timeStamps: true })

const offer = mongoose.model('offer', offerSchema)

module.exports = offer