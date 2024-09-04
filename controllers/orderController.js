//services
const addressService=require('../services/addressServices');
const cartService=require('../services/cartServices')
const orderService=require('../services/orderServices')

exports.getCheckout=async(req,res)=>{
    try{
        let address=await addressService.viewAddress(req.userID)
        let cart=await cartService.viewCart(req.userID)
        res.render('checkout',{address,cart})

    }catch(err){

    }
}

exports.postCheckout=async(req,res)=>{
    
    try{
        const {products,addressId,paymentMethod,subTotalAmmount,totalAmmount,cartItemIds}=req.body;
        
        await orderService.createOrder(products,addressId,paymentMethod,subTotalAmmount,totalAmmount,req.userID)

        await cartService.deleteManyCartItem(cartItemIds,subTotalAmmount,req.userID)
        res.status(200).json({success:true,successRedirect:'/'})

    }catch(err){
        console.log(err);
        
    }
}

exports.patchCancel=async(req,res)=>{
    try{
        const orderProductsID=req.params.id;
        await orderService.cancelOrders(orderProductsID,req.userID)
        res.json({success:true})

    }catch(err){
        console.log(err);
    }
}