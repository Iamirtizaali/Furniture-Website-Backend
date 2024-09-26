const joi=require('@hapi/joi');

const authSchema=joi.object({
    email:joi.string().lowercase().email().required(),
    password:joi.string().min(6).required()
});

const userSchema=joi.object({
    name:joi.string().required(),
    username:joi.string().required(),
    email:joi.string().email().lowercase().required(),
    password:joi.string().min(6).required(),
});

const categorySchema=joi.object({
    name:joi.string().required(),
    description:joi.string().required(),
});

const productSchema=joi.object({
    name:joi.string().required(),
    category:joi.string().required(),
    description:joi.string().required(),
    price:joi.number().required(),
    available_sizes:joi.array().items(joi.string()).required(),
    available_colors:joi.array().items(joi.string()).required(),
    stock_quantity:joi.number().required(),
});

const orderSchema=joi.object({
    user_id:joi.string().required(),
    order_date:joi.date().required(),
    order_status:joi.string().required(),
    order_items:joi.array().items(joi.object({
        product_id:joi.string().required(),
        quantity:joi.number().required(),
        price:joi.number().required(),
    })).required(),
    total_amount:joi.number().required(),
    payment_method:joi.string().required(),
});

const blogSchema=joi.object({
    title:joi.string().required(),
    content:joi.string().required(),
    author:joi.string().required(),
});

const newsletterSchema=joi.object({
    email:joi.string().email().required(),
});

const reviewSchema=joi.object({
    product_id:joi.string().required(),
    user_id:joi.string().required(),
    rating:joi.number().required(),
    review_text:joi.string().required(),
});

const loginSchema=joi.object({
    email:joi.string().email().required(),
    password:joi.string().min(6).required(),
});

const updatePasswordSchema=joi.object({
    old_password:joi.string().min(6).required(),
    new_password:joi.string().min(6).required(),

});

module.exports={
    authSchema,
    userSchema,
    categorySchema,
    productSchema,
    orderSchema,
    blogSchema,
    newsletterSchema,
    reviewSchema,
    loginSchema,
    updatePasswordSchema,
}


// const result = await authSchema.validateAsync(req.body);
// console.log(result);

// if(error.isJoi===true) {
//     res.status(400).json({
//         error:error.details.map((err)=>err.message),
//     });
//     return;
// }

// after validation rather than searching for email it should be result.email