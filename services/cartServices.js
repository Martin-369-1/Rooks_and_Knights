const cartCollection=require('../models/cartModel')
const productCollection=require('../models/productsModel')

exports.addToCart=async(userID,productID,quantity)=>{
    try{
        const product=await productCollection.findById(productID)
        const cart=await cartCollection.findOne({userID})

        if(!cart){
            const newCart=new cartCollection({
                userID,
                cartItems:[
                    {
                        productID,
                        quantity
                    }
                ],
                totalPrice:product.price*quantity
            })
            return await newCart.save()
        }
        
        const cartItemIndex=cart.cartItems.findIndex(item => item.productID.toString() === productID);
        if (cartItemIndex !== -1) {
            
            if(cart.cartItems[cartItemIndex].quantity+Number(quantity) <= product.stock){
                // If the product exists, update its quantity
                cart.cartItems[cartItemIndex].quantity += Number(quantity);
                cart.totalPrice += product.price * Number(quantity);
            }else{
                return {error:"Item aldready in cart and out of stock"}
            }

        } else {
            // If the product doesn't exist, add it to the cart
            cart.cartItems.push({ productID, quantity });
            cart.totalPrice += product.price * Number(quantity);
        }
        
        return await cart.save();
    }catch(err){
        console.log(err);   
    }
}

exports.viewCart=async(userID)=>{
    try{
        return await cartCollection.findOne({userID})

        .populate({
            path:'cartItems.productID'
        })


    }catch(err){
        console.log(err);
    }
}

exports.deleteCartItem=async(cartItemID,userID)=>{
    try{
        let cart = await cartCollection.findOne({userID})
        .populate({
            path:'cartItems.productID'
        })
        
        let price=0;
        cart.cartItems.forEach(cartItem => {
            if(cartItem._id==cartItemID){
                price=cartItem.productID.price * cartItem.quantity;
            }
        });
        

        await cartCollection.updateOne({userID},{$pull:{cartItems:{_id:cartItemID}},$inc:{totalPrice:-price}})
    }catch(err){
        console.log(err);  
    }
}

exports.updateCart=async(cartItems,totalPrice,userID)=>{
    try{
        await cartCollection.updateOne({userID},{$set:{cartItems,totalPrice}})
    }catch(err){
        console.log(err);
        
    }
}

