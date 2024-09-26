const controller = require('./controller');
const express = require('express');
const {isAdmin} = require('../../../helpers/isAdmin');
const router = express.Router();
const { userBruteforce, sanitizeData } = require('../../../helpers/security');
const {auth}=require('../../middlewares/auth');


// Endpoint to handle creating a Stripe Checkout Session
router.post('/checkout',sanitizeData,auth,controller.createCheckoutSession);

// Payment success route
router.get('/payment-success',sanitizeData,controller.paymentSuccess);

// Payment cancel route
router.get('/payment-cancel',sanitizeData,controller.paymentCancel);

module.exports = router;
