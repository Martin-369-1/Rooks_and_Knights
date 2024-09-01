const mongoose=require('mongoose')

const Schema=mongoose.Schema;

const orderSchema=Schema({
    userID:{
        type: Schema.Types.ObjectId,
        required:true,
        ref:'users'
    },
    addressId:{
        type:Schema.Types.ObjectId,
        ref:'addresses',
        required:true
    },
    subTotalAmmount:{
        type:Number,
        required:true
    },
    orderStatus:{ 
        type: String,
        default: 'pending' 
    },
    discount:{
        type:Number,
        default:0
    },
    totalAmmount:{
        type:Number,
        required:true
    },
    paymentMethod:{
        type:String,
        required:true
    },
    paymentStatus:{
        type:Boolean,
        required:true,
        default:false
    },
    products:[
        {
            productID:{
                type: Schema.Types.ObjectId,
                required:true,
                ref:"products"
            },
            quantity:{
                type:Number,
                required:true
            },
            status: 
            { 
                type: String,
                enum: ['pending', 'delivered', 'canceled'],
                default: 'pending' 
            },
            price:{
                type:Number,
                required:true
            }
        }
    ],
},{timestamps: true});

const orders=mongoose.model('orders',orderSchema);

module.exports=orders;

