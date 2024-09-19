const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Blog", blogSchema);