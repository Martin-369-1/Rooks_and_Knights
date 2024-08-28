//requiring modules
const express = require('express')
const router = express.Router();

//controllers
const homeController = require('../controllers/homeController');

router.get('/', homeController.getHome);


module.exports = router;