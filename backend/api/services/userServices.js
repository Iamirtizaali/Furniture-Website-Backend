const User=require('../models/user');

const addUser=async(user)=>{
    try{
        return await User.create(user);
    }
    catch(error){
        throw new Error(error);
    }
}

const getUser=async(email)=>{
    try{
        return await User.findOne({email});
    }
    catch(error){
        throw new Error(error);
    }
}

const updateUser=async(email,update)=>{
    try{
        return
        await User.findOneAndUpdate
        ({email},update,{new:true});
    }
    catch(error){
        throw new Error(error);
    }
}

const deleteUser=async(email)=>{
    try{
        return await User.findOneAndDelete({email});
    }
    catch(error){
        throw new Error(error);
    }
}

const getUserById=async(id)=>{
    try{
        return await User.findById(id);
    }
    catch(error){
        throw new Error(error);
    }
}

const getAllUsers=async()=>{
    try{
        return await User.find();
    }
    catch(error){
        throw new Error(error);
    }
}

const addWishlist=async(id,product_id)=>{
    try{
        return await User.findByIdAndUpdate(id,
            {$push:{wishlist:product_id}},{new:true});
    }
    catch(error){
        throw new Error(error);
    }
}

const getWishlist=async(id)=>{
    try{
        return await User.findById(id).populate('wishlist');
    }
    catch(error){
        throw new Error(error);
    }
}

const removeWishlist=async(id,product_id)=>{
    try{
        return await User.findByIdAndUpdate(id,
            {$pull:{wishlist:product_id}},{new:true});
    }
    catch(error){
        throw new Error(error);
    }
}

const addOrder=async(id,order_id)=>{
    try{
        return await User.findByIdAndUpdate(id,
            {$push:{orders:order_id}},{new:true});
    }
    catch(error){
        throw new Error(error);
    }
}
const addAddress=async(id,address)=>{
    try{
        return await User.findByIdAndUpdate(id,
            {$push:{addresses:address}},{new:true});

    }
    catch(error){
        throw new Error(error);
    }
}

const removeAddress=async(id,address)=>{
    try{
        return await User.findByIdAndUpdate(id,
            {$pull:{addresses:address}},{new:true});
    }
    catch(error){
        throw new Error(error);
    }
}

const updateAddress=async(id,address_id,address)=>{
    try{
        return await User.findOneAndUpdate(id,{"addresses._id":address_id},address,{new:true});
    }
    catch(error){
        throw new Error(error);
    }
}



module.exports={addUser,getUser,updateUser,deleteUser,getUserById,getAllUsers,addWishlist,removeWishlist,addOrder,addAddress,removeAddress,updateAddress,getWishlist};
