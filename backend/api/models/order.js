const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
     user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        order_date: {
            type: Date,
            required: true,
        },
        order_status: {
            type: String,
            required: true,
            default: "Pending",
        },
        order_items: [
            {
                product_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                price:
                {
                    type: Number,
                    required: true,
                },
            },
        ],
        total_amount: {
            type: Number,
            required: true,
        },
        payment_method: {
            type: String,
            required: true,
        },
        contactInformation:{
                firstName:{
                    type:String,
                    required:true,
                },
                lastName:{
                    type:String,
                    required:true,
                },
                email:{
                    type:String,
                    required:true,
                },
                phone:{
                    type:String,
                    required:true,
                },
        },
        shippingAddress:{
            address:{
                type:String,
                required:true,
            },
            city:{
                type:String,
                required:true,
            },
            postalCode:{
                type:String,
                required:true,
            },
            country:{
                type:String,
                required:true,
            },
            state:{
                type:String,
                required:true,
            }
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Order", orderSchema);