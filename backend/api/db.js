const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });
mongoose.connect(process.env.MONGODB_URI,
    {
    }
)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB", err);
    });
    
module.exports = mongoose;