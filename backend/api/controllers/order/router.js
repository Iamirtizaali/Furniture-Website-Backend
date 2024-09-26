const controller = require('./controller');
const express = require('express');
const {isAdmin} = require('../../../helpers/isAdmin');
const router = express.Router();
const { userBruteforce, sanitizeData } = require('../../../helpers/security');
const {auth}=require('../../middlewares/auth');



router.get('/',auth, isAdmin, controller.getAllOrders);
router.get('/user',auth, controller.getUserOrders);
router.get('/:id',auth, controller.getOrderById);
router.post('/createOrder/:payment_method',auth, controller.createOrderFromCart);
router.put('/:id',auth, controller.updateOrder);
router.delete('/:id',auth, controller.deleteOrder);

module.exports = router;