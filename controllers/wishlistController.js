//services
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
        if (error) {
            return res.json({ error, errorRedirect: `<a href="/wishlist">Go to Wishlist</a>` })
        }
        res.json({ success: "Item added to wishlist" })

    } catch (err) {
        console.log(err);
        res.json({ error: "server error" })
    }
}

//delete a product form wishlist
exports.deleteFromWishlist = async (req, res) => {
    try {
        const wishlistItemId = req.params.id;
        await wishlistService.deleteFromWishlist(req.userID, wishlistItemId)
        res.json({ success: true })

    } catch (err) {
        console.log(err);
        res.json({ error: "server error" })
    }
}