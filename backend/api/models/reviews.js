const mongoose = require("mongoose");


const reviewSchema = new mongoose.Schema({
    product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    rating:{
        type:Number,
        required:true,
    },
    review_text:{
        type:String,
        required:true,
    },
},
{
    timestamps: true,
}
);