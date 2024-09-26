const blogServices=require('../../services/blogServices');
const userServices = require("../../services/userServices");
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


const addBlog = async (req, res) => {
    try{
        const {title,content}=req.body;
        const author=req.user.id;
            const result=await blogSchema.validateAsync({title,content,author});
        const blog=await blogServices.createBlog(result);
        res.status(201).send(blog);
    }
    catch(error){
        res.status(400).send({message:error.message});
    }
}

const getBlog = async (req, res) => {
    try{
        const blog=await blogServices.getBlogById(req.params.id);
        res.status(200).send(blog);
    }
    catch(error){
        res.status(400).send({message:error.message});
    }
}

const updateBlog=async (req,res)=>{
    try{
        const result=await blogSchema.validateAsync(req.body);
        const blog=await blogServices.updateBlog(req.params.id,result);
        res.status(200).send(blog);
    }
    catch(error){
        res.status(400).send({message:error.message});
    }
}

const deleteBlog=async (req,res)=>{
    try{
        const blog=await blogServices.deleteBlog(req.params.id);
        res.status(200).send(blog);
    }
    catch(error){
        res.status(400).send({message:error.message});
    }
}


const getAllBlogs=async (req,res)=>{
    try{
        const blog=await blogServices.getBlogs();
        res.status(200).send(blog);
    }
    catch(error){
        res.status(400).send({message:error.message});
    }
}

module.exports={
    addBlog,
    getBlog,
    updateBlog,
    deleteBlog,
    getAllBlogs
}