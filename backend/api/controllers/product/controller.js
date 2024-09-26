const userServices=require('../../services/userServices');
const productServices=require('../../services/productServices');
const categoryServices=require('../../services/categoriesServices');
const orderServices=require('../../services/orderServices');
const {authSchema,
    userSchema,
    categorySchema,
    productSchema,
    orderSchema,
    blogSchema,
    newsletterSchema,
    loginSchema,
    reviewSchema,
    updatePasswordSchema,
} = require("../../middlewares/validationMiddleware");



const addProduct=async(req,res)=>{
    try{
        const result=await productSchema.validateAsync(req.body);
        const product=await productServices.addProduct(result);
        res.status(201).send(product);
    }
    catch(error){
        res.status(400).send({message:error.message});
    }
}


const getProduct=async(req,res)=>{
    try{
        const product=await productServices.getProduct(req.params.id);
        res.status(200).send(product);
    }
    catch(error){
        res.status(400).send({message:error.message});
    }
}

const updateProduct=async(req,res)=>{
    try{
        const result=await productSchema.validateAsync(req.body);
        const product=await productServices.updateProduct(req.params.id,result);
        res.status(200).send(product);
    }
    catch(error){
        res.status(400).send({message:error.message});
    }
}

const deleteProduct=async(req,res)=>{
    try{
        const product=await productServices.deleteProduct(req.params.id);
        res.status(200).send(product);
    }
    catch(error){
        res.status(400).send({message:error.message});
    }
}

const getAllProducts=async(req,res)=>{
    try{
        const products=await productServices.getAllProducts();
        res.status(200).send(products);
    }
    catch(error){
        res.status(400).send({message:error.message});
    }
}

const sortBycategory=async(req,res)=>{
    try{
        const products=await productServices.sortBycategory(req.params.category);
        res.status(200).send(products);
    }
    catch(error){
        res.status(400).send({message:error.message});
    }
}

const sortByName=async(req,res)=>{
    try{
        const products=await productServices.sortByName(req.params.name);
        res.status(200).send(products);
    }
    catch(error){
        res.status(400).send({message:error.message});
    }
}

const sortByPrice=async(req,res)=>{
    try{
        const products=await productServices.sortByPrice(req.params.price);
        res.status(200).send(products);
    }
    catch(error){
        res.status(400).send({message:error.message});
    }
}

const addToWishlist=async(req,res)=>{
    try{
        const userId=req.user.id;
        const product=await userServices.addWishlist(userId,req.params.id);

        res.status(200).send(product);
    }
    catch(error){
        res.status(400).send({message:error.message});
    }
}

const getWishlist=async(req,res)=>{
    try{
        const userId=req.user.id;
        const products=await userServices.getWishlist(userId);
        res.status(200).send(products);
    }
    catch(error){
        res.status(400).send({message:error.message});
    }
}

const deleteWishlist=async(req,res)=>{
    try{
        const userId=req.user.id;
        const product=await userServices.removeWishlist(userId,req.params.id);
        res.status(200).send(product);
    }
    catch(error){
        res.status(400).send({message:error.message});
    }
}

const uploadImage=async(req,res)=>{
    try{
        const result=await productServices.uploadPicture(req.user.id,req.file.path);
        res.status(200).send({result});
    }
    catch(error){
        res.status(400).send({message:error.message});
    }
}

module.exports={
    addProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    sortBycategory,
    sortByName,
    sortByPrice,
    addToWishlist,
    getWishlist,
    deleteWishlist,
    uploadImage,
}