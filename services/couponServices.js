//models
const couponCollection=require('../models/couponModel')

exports.addCouponDiscount=async(subTotalAmount,couponCode)=>{
    const now=new Date()
    now.setHours(0,0,0,0)
    try{
        const coupon=await couponCollection.findOne({couponCode})

        if(!coupon){
            return {error:"coupon not found"}
        }

        if(coupon.expiryDate < now){
            return {error:"coupon expired"}
        }

        if(subTotalAmount < coupon.minimumOrderAmount){
            return {error:`To use this coupon there must me minimum order amount of ${subTotalAmount}`}
        }
        
        return {discount:coupon.discountAmount}

    }catch(err){
        console.log(err);
    }
}