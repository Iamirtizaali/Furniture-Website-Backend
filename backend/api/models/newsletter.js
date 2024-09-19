const mongoose = require("mongoose");


const newsletterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },
},
{
    timestamps: true,
}
);