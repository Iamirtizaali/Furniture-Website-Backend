const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
   available_sizes:[
         {
              type:String,
         }
    ],
   available_colors:[
    {
        type:String,
    }
   ],
   stock_quantity:{
       type:Number,
       required:true,
   },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model('Product', productSchema);