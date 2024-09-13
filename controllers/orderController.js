//services
const addressService = require('../services/addressServices');
const cartService = require('../services/cartServices')
const orderService = require('../services/orderServices')
const walletService = require('../services/walletService')
const transationService = require('../services/transationService')
const couponService=require('../services/couponServices')

//utils
const { verifyPayment } = require('../utils/razorpayPaymentVerify')

//razorpay
const Razorpay = require('razorpay');
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

//geting checkout page
exports.getCheckout = async (req, res) => {
    try {
        let address = await addressService.viewAddress(req.userID)
        let cart = await cartService.viewCart(req.userID)
        res.render('checkout', { address, cart })

    } catch (err) {
        console.log(err);
        res.redirect('/error')
    }
}

//creating order
exports.postCheckout = async (req, res) => {

    try {
        const { products, addressId, paymentMethod, subTotalAmmount, totalAmmount, cartItemIds ,discount} = req.body;

        //if cash on delivery
        if (paymentMethod == 'COD') {
            await cartService.deleteManyCartItem(cartItemIds, subTotalAmmount, req.userID)
            await orderService.createOrder(products, addressId, paymentMethod, subTotalAmmount, totalAmmount, discount, req.userID)
            return res.status(200).json({ success: true, successRedirect: '/' })
        }

        //if wallet
        if (paymentMethod == "Wallet") {
            const error = await walletService.payFromWallet(req.userID, totalAmmount)

            if (error) {
                return res.status(400).json({ error })
            }

            await cartService.deleteManyCartItem(cartItemIds, subTotalAmmount, req.userID)
            const order = await orderService.createOrder(products, addressId, paymentMethod, subTotalAmmount, totalAmmount,discount, req.userID)
            await orderService.completePayment(order._id)
            await transationService.completeTransation(req.userID, totalAmmount, 'purchase', paymentMethod)

            return res.status(200).json({ success: true, successRedirect: '/' })
        }

        //if razorpay
        
        const order = await orderService.createOrder(products, addressId, paymentMethod, subTotalAmmount, totalAmmount,discount, req.userID)

        const options = {
            amount: order.totalAmmount * 100,
            currency: "INR",
        }

        razorpay.orders.create(options, (err, razorpayOrder) => {
            if (err) {
                console.log(err);
            }

            req.session.order = order;
            req.session.cartItemIds = cartItemIds;
            res.status(200).json({ razorpayOrder })
        })



    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server Error" })
    }
}

//complete payment using razorpay
exports.completePayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const { _id, totalAmmount, paymentMethod } = req.session.order;

        const isValid = verifyPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature, process.env.RAZORPAY_KEY_SECRET);
        if (!isValid) {
            res.status(400).json({ error: 'payment not valid' })
        }

        await orderService.completePayment(_id)
        await cartService.deleteManyCartItem(req.session.cartItemIds, totalAmmount, req.userID)
        await transationService.completeTransation(req.userID, totalAmmount, 'purchase', paymentMethod)
        res.redirect('/')


    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server Error" })
    }
}

//apply coupon
exports.postAddCouponDiscount=async(req,res)=>{
    try{
        const {subTotalAmmount,couponCode}=req.body;
        
        const coupon=await couponService.addCouponDiscount(subTotalAmmount,couponCode)

        if(coupon.error){
            return res.status(400).json({ error:coupon.error})
        }
        
        return res.status(200).json({success:true,couponDiscount:coupon.discount})

    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Server Error" })
    }
}

//cancel an order
exports.patchCancel = async (req, res) => {
    try {
        const { productID, productQuantity, price } = req.body;
        const orderProductsID = req.params.id;
        const paymentMethod = await orderService.cancelOrders(orderProductsID, req.userID, productID, productQuantity)
        await transationService.completeTransation(req.userID, price * productQuantity, 'refund')

        if (paymentMethod == "Razorpay" || paymentMethod == "Wallet") {
            await walletService.addToWallet(req.userID, price)
        }
        res.json({ success: true })

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server Error" })
    }
}

//request for return
exports.patchReturn = async (req, res) => {
    try {
        const { returnReason } = req.body;
        console.log(returnReason);

        const orderProductsID = req.params.id;
        await orderService.returnOrders(req.userID, orderProductsID, returnReason)

        res.status(200).json({ success: true })
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server Error" })
    }
}


