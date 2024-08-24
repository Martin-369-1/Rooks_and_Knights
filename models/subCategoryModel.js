const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subCategorySchema = new Schema({
  
  subCategoryName: { 
    type: String, 
    unique:true,
    required: true 
  },
  subCategoryDescription:{
    type:String,
    required:true
  },
  
  isDeleted:{
    type:Boolean,
    required:true,
    default:false
  }

}, {timestamps: true  });


const subCategory = mongoose.model('subCategories', subCategorySchema);

module.exports = subCategory;

