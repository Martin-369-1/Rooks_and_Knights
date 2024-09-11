//requiring modules
const express = require('express')
const router = express.Router();

//controllers
const addressController = require('../controllers/addressController')

//middlewares
const userAuthMiddleware = require('../middlewares/userAuthMiddleware')

//routers
router.post('/add', userAuthMiddleware.validUser, addressController.postNewAddress) //add new address
router.delete('/delete/:id', userAuthMiddleware.validUser, addressController.deleteAddress) //delete address
router.put('/edit/:id', userAuthMiddleware.validUser, addressController.putAddress) //edit address

module.exports = router;