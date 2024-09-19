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
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Order", orderSchema);