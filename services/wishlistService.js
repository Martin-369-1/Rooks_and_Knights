//models
const wishlistCollection = require('../models/wishlistModel');

//render wislist
exports.viewWishlist = async (userID) => {
    try {
        const wishlist = await wishlistCollection.findOne({ userID }).populate('wishlistItems.productID')

        if (!wishlist) {
            const newWishlist = new wishlistCollection({
                userID,
                wishlistItems: []
            })

            await newWishlist.save()
            return newWishlist;
        }
        return wishlist;

    } catch (err) {
        console.log(err);
    }
}

//add new product to wishlit 
exports.addToWishlist = async (userID, productID) => {
    try {
        const wishlist = await wishlistCollection.findOne({ userID })

        if (!wishlist) {
            const newWishlist = new wishlistCollection({
                userID,
                wishlistItems: [
                    {
                        productID
                    }
                ]
            })

            await newWishlist.save()
            return
        }

        wishlist.wishlistItems.push({ productID })

        await wishlist.save()

    } catch (err) {
        console.log(err);
    }
}

//delete a product form wishlist 
exports.deleteFromWishlist = async (userID, productID) => {
    try {

        const updatedWishlist = await wishlistCollection.updateOne(
            { userID },
            { $pull: { wishlistItems: { productID } } },
        );

    } catch (err) {
        console.log(err);
    }
}

exports.productInWishlist = async (userID, productID) => {
    try {
        const productInWishlist = await wishlistCollection.findOne({ userID, 'wishlistItems.productID': productID })
        return !!productInWishlist
    } catch (err) {
        console.log(err)
    }
}