//models
const couponCollection=require('../models/couponModel')

exports.addCouponDiscount=async(totalAmount,couponCode)=>{
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

        if(totalAmount < coupon.minimumOrderAmount){
            return {error:`To use this coupon there must me total amount of ${coupon.minimumOrderAmount}`}
        }
        
        return {discount:coupon.discountAmount,_id:coupon._id}

    }catch(err){
        console.log(err);
    }
}