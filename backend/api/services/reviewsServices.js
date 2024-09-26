const Reviews=require('../models/reviewsModel');
const User=require('../models/userModel');
const Product=require('../models/productModel');

const addReview=async(reviewData)=>{
    try{
        const review=new Reviews(reviewData);
        await review.save();
        return review;
    }
    catch(error){
        throw error;
    }
}

const getReviews=async()=>{
    try{
        const reviews=await Reviews.find();
        return reviews;
    }
    catch(error){
        throw error;
    }
}

const getReviewById=async(id)=>{
    try{
        const review=await Reviews.findById(id);
        return review;
    }
    catch(error){
        throw error;
    }
}

const updateReview=async(id,reviewData)=>{
    try{
        const review=await Reviews.findByIdAndUpdate(id,reviewData,{new:true});
        return review;
    }
    catch(error){
        throw error;
    }
}

const deleteReview=async(id)=>{
    try{
        const review=await Reviews.findByIdAndDelete(id);
        return review;
    }
    catch(error){
        throw error;
    }
}

const getProductReviews=async(product_id)=>{
    try{
        const reviews=await Reviews.find({product_id:product_id});
        return reviews;
    }
    catch(error){
        throw error;
    }
}

const getUserReviews=async(user_id)=>{
    try{
        const reviews=await Reviews.find({user_id:user_id});
        return reviews;
    }
    catch(error){
        throw error;
    }
}

module.exports={
    addReview,
    getReviews,
    getReviewById,
    updateReview,
    deleteReview,
    getProductReviews,
    getUserReviews
};
