const controller = require('./controller');
const express = require('express');
const {isAdmin} = require('../../../helpers/isAdmin');
const router = express.Router();
const { userBruteforce, sanitizeData } = require('../../../helpers/security');
const {auth}=require('../../middlewares/auth');


router.post('/addProduct',sanitizeData,auth,controller.addItemToCart);
router.put('/increaseQuantity/:id',sanitizeData,auth,controller.increaseQuantity);
router.put('/decreaseQuantity/:id',sanitizeData,auth,controller.decreaseQuantity);
router.delete('/deleteProduct',sanitizeData,auth,controller.deleteItemFromCart);
router.get('/getCart',sanitizeData,auth,controller.getCart);


module.exports = router;