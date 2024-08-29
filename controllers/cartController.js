//services
const cartServices = require('../services/cartServices')

//render cartpage
exports.getCart = async (req, res) => {
    try {
        let cart = await cartServices.viewCart(req.userID)
        res.render('cart', { cart })
    } catch (err) {
        console.log(err);

    }
}

//adding a new product to cart
exports.addToCart = async (req, res) => {
    try {
        const productID = req.params.id;
        const { quantity } = req.body;
        const userID = req.userID;

        const { error } = await cartServices.addToCart(userID, productID, quantity)
        if (error) {
            return res.status(200).json({ error, errorRedirect: `<a href="/cart">Check cart</a>` })
        }
        res.status(200).json({ success: "Item added to cart" })
    } catch (err) {
        console.log(err);
    }
}

//delete cart
exports.deleteCartItem = async (req, res) => {
    try {
        const cartItemID = req.params.id;
        await cartServices.deleteCartItem(cartItemID, req.userID)
        res.status(200).json({ success: true })
    } catch (err) {
        console.log(err);

    }
}

//update cart product quantity
exports.putUpdateCart = async (req, res) => {
    try {
        const { cartItems, totalPrice } = req.body;
     

        await cartServices.updateCart(cartItems, totalPrice, req.userID);
        res.status(200).json({ success: true })
    } catch (err) {
        console.log(err);

    }
}