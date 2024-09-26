const Categories=require('../models/categories');
const Product=require('../models/product');

const addCategory=async(category)=>{
    try{
        return await Categories.create(category);
    }
    catch(error){
        throw new Error(error);
    }
}

const getCategory=async(id)=>{
    try{
        return await Categories.findById(id);
    }
    catch(error){
        throw new Error(error);
    }
}

const updateCategory=async(id,update)=>{
    try{
        return await Categories.findByIdAndUpdate(id,update,{new:true});
    }
    catch(error){
        throw new Error(error);
    }
}

const deleteCategory=async(id)=>{
    try{
        return await Categories.findByIdAndDelete(id);
    }
    catch(error){
        throw new Error(error);
    }
}

const getAllCategories=async()=>{
    try{
        return await Categories.find();
    }
    catch(error){
        throw new Error(error);
    }
}

const getProductsByCategory=async(category)=>{
    try{
        return await Product.find({category:category});
    }
    catch(error){
        throw new Error(error);
    }
}

module.exports={
    addCategory,
    getCategory,
    updateCategory,
    deleteCategory,
    getAllCategories,
    getProductsByCategory
};
