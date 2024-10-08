const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subCategorySchema = new Schema({

  subCategoryName: {
    type: String,
    unique: true,
    required: true
  },
  subCategoryDescription: {
    type: String,
    required: true
  },
  noOfOrders: {
    type: Number,
    default: 0
  },

  isListed: {
    type: Boolean,
    required: true,
    default: true
  },

  offer: {
    type: Number,
    default: 0
  }

}, { timestamps: true });


const subCategory = mongoose.model('subCategories', subCategorySchema);

module.exports = subCategory;

