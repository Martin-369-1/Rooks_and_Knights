const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  
  categoryName: { 
    type: String, 
    unique:true,
    required: true 
  },

  offer: { 
    type: Number, 
    default: 0  
  },

  isDeleted:{
    type:Boolean,
    required:true,
    default:false
  }

}, {timestamps: true  });


const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;

