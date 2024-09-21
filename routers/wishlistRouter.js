//modules
const express = require('express')
const router = express.Router()

//middlewares
const userAuthMiddleware = require('../middlewares/userAuthMiddleware');

//controllers
const wishlistController = require('../controllers/wishlistController');

//routers
router.get('/', userAuthMiddleware.checkUserAuthenticated, wishlistController.getWishlist);
router.post('/:id', userAuthMiddleware.validUser, wishlistController.addToWihslist);
router.delete('/:id', userAuthMiddleware.validUser, wishlistController.deleteFromWishlist);

module.exports = router;
