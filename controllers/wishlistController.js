//services
const wishlist = require('../models/wishlistModel');
const wishlistService = require('../services/wishlistService')

//render wishlist page
exports.getWishlist = async (req, res) => {
    try {
        const wishlist = await wishlistService.viewWishlist(req.userID);
        res.render('wishlist', { wishlist })

    } catch (err) {
        console.log(err);
        res.redirect('/error')
    }
}

//add a product to wishlist
exports.addToWihslist = async (req, res) => {
    try {
        const productId = req.params.id;
        let error = await wishlistService.addToWishlist(req.userID, productId)

        res.json({ success: true , successMessage:'product added to wishlist'})

    } catch (err) {
        console.log(err);
        res.json({ error: "server error" })
    }
}

//delete a product form wishlist
exports.deleteFromWishlist = async (req, res) => {
    try {
        
        const wishlistItemID = req.params.id;
        await wishlistService.deleteFromWishlist(req.userID, wishlistItemID)
        res.json({ success: true ,successMessage:'product removed for wihslist'})

    } catch (err) {
        console.log(err);
        res.json({ error: "server error" })
    }
}