const controller = require('./controller');
const express = require('express');
const {isAdmin} = require('../../../helpers/isAdmin');
const router = express.Router();
const { userBruteforce  , sanitizeData } = require('../../../helpers/security');
const {auth}=require('../../middlewares/auth');
router.post('/register', sanitizeData, controller.register);
router.post('/login', userBruteforce.prevent, sanitizeData, controller.login);
router.put('/updatePassword', userBruteforce.prevent, sanitizeData, auth, controller.updatePassword);
router.put('/addAddress', userBruteforce.prevent, sanitizeData, auth, controller.addAddress);
//router.put('/update',userBruteforce.prevent,sanitizeData,auth, controller.updateUser);
// router.delete('/delete',userBruteforce.prevent,sanitizeData,auth, controller.deleteUser);
module.exports = router;