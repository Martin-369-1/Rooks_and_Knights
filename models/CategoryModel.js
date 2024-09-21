const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({

  categoryName: {
    type: String,
    unique: true,
    required: true
  },

  categoryDescription: {
    type: String,
    required: true
  },

  offer: {
    type: Number,
    default: 0
  },

  noOfOrders:{
    type:Number,
    default:0
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false
  }

}, { timestamps: true });


const Category = mongoose.model('categories', CategorySchema);

module.exports = Category;

