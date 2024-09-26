const controller = require('./controller');
const express = require('express');
const {isAdmin} = require('../../../helpers/isAdmin');
const router = express.Router();
const { userBruteforce, sanitizeData } = require('../../../helpers/security');
const {auth}=require('../../middlewares/auth');


router.post('/addBlog',sanitizeData,auth,isAdmin,controller.addBlog);
router.get('/getBlog/:id',sanitizeData,auth,isAdmin,controller.getBlog);
router.put('/updateBlog/:id',sanitizeData,auth,isAdmin,controller.updateBlog);
router.delete('/deleteBlog/:id',sanitizeData,auth,isAdmin,controller.deleteBlog);
router.get('/getAllBlogs',sanitizeData,auth,isAdmin,controller.getAllBlogs);


module.exports = router;