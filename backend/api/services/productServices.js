const Product=require('../models/product');
const User=require('../models/user');
const addProduct=async(product)=>{
    try{
        return await Product.create(product);
    }
    catch(error){
        throw new Error(error);
    }
}

const getProduct=async(id)=>{
    try{
        return await
        Product.findById(id);
    }
    catch(error){
        throw new Error(error);
    }
}

const updateProduct=async(id,update)=>{
    try{
        return await Product.findByIdAndUpdate(id,update,{new:true});
    }
    catch(error){
        throw new Error(error);
    }
}

const deleteProduct=async(id)=>{
    try{
        return await Product.findByIdAndDelete(id);
    }
    catch(error){
        throw new Error(error);
    }
}

const getAllProducts=async()=>{
    try{
        return await Product.find();
    }
    catch(error){
        throw new Error(error);
    }
}

const sortBycategory=async(category)=>{
    try{
        return await Product.find({category:category});
    }
    catch(error){
        throw new Error(error);
    }
}

const sortByName=async(name)=>{
    try{
        return await Product.find({name:name});
    }
    catch(error){
        throw new Error(error);
    }
}

const sortByPrice=async(price)=>{
    try{
        return await Product.find({price:price});
    }
    catch(error){
        throw new Error(error);
    }
}

const sortBySize=async(size)=>{
    try{
        return await Product.find({size:size});
    }
    catch(error){
        throw new Error(error);
    }
}

const sortByColor=async(color)=>{
    try{
        return await Product.find({color:color});
    }
    catch(error){
        throw new Error(error);
    }
}

const uploadPicture=async function(_id,picture){
    // Upload to cloud storage
    const user=await User.findOne({_id:_id});
    user.picture=picture;
    await user.save();
    return user;
}

const uploadDocuments=async function(_id,documents){
    // Upload to cloud storage
    const user=await User.findOne({_id:_id});
    user.documents=documents;
    await user.save();
    return user;
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
    sortBySize,
    sortByColor,
    uploadPicture,
    uploadDocuments
}
