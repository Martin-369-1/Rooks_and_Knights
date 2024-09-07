const mongoose=require('mongoose')

const Schema=mongoose.Schema;

const wishlistSchema=Schema({
    userID:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'users'
    },
    wishlistItems:[{
        productID:{
            type:Schema.Types.ObjectId,
            required:true,
            ref:'products'
        }
    }]
})

const wishlist=mongoose.model('wishlist',wishlistSchema);

module.exports=wishlist;