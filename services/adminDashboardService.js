const productsCollection=require('../models/productsModel')
const categoryCollection=require('../models/CategoryModel')
const subCategoryCollection=require('../models/subCategoryModel')
const orderCollection=require('../models/orderModel')

module.exports.TopTenList=async()=>{
    try{

        const topTenProductsList=await productsCollection.find({isListed:true}).sort({noOfOrders:-1}).limit(10)
        
        const topTenCategoryList=await categoryCollection.find({isListed:true}).sort({noOfOrders:-1}).limit(10)

        const topTenSubCategoryList=await subCategoryCollection.find({isListed:true}).sort({noOfOrders:-1}).limit(10)
        
        return {topTenProductsList,topTenCategoryList,topTenSubCategoryList}
    }catch(err){
        console.log(err);
    }
}

exports.dailySales=async()=>{
    try{ 
        const dailySales = await orderCollection.aggregate([
            {$unwind:'$products'},
            {
              $group: {
                _id: { 
                  day: { $dayOfMonth: "$createdAt" }, 
                  month: { $month: "$createdAt" }, 
                  year: { $year: "$createdAt" }
                },
                totalSales: { $sum: 1 },
              }
            },
            { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }
          ]);

          return dailySales
    }catch(err){
        console.log(err);
        
    }
}

exports.monthlySales=async()=>{
    try{
        const monthlySales = await orderCollection.aggregate([
            {$unwind:'$products'},
            {
              $group: {
                _id: { 
                  month: { $month: "$createdAt" }, 
                  year: { $year: "$createdAt" } 
                },
                totalSales: { $sum: 1 },
              }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
          ]);
        
        return monthlySales
    }catch(err){
        console.log(err);
    }
}

exports.yearlySales=async()=>{
    try{
        const yearlySales = await orderCollection.aggregate([
            {$unwind:'$products'},
            {
              $group: {
                _id: {
                    year:{
                        $year: "$createdAt"
                    }
                     }, // Group by year
                totalSales: { $sum: 1 }, 
              }
            },
            { $sort: { "_id": 1 } }
          ]);
          
        return yearlySales
    }catch(err){
        console.log(err);
    }
}