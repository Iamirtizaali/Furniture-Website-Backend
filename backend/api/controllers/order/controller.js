const userServices=require('../../services/userServices');
const productServices=require('../../services/productServices');
const categoryServices=require('../../services/categoriesServices');
const Order=require('../../models/order');
const Cart=require('../../models/cart');
const orderServices=require('../../services/orderServices');
const {authSchema,
    userSchema,
    categorySchema,
    productSchema,
    orderSchema,
    blogSchema,
    newsletterSchema,
    loginSchema,
    reviewSchema,
    updatePasswordSchema,
} = require("../../middlewares/validationMiddleware");


const getAllOrders=async(req,res)=>{
    try{
        const orders=await orderServices.getAllOrders();
        res.status(200).send(orders);
    }
    catch(error){
        res.status(400).send({message:error.message});
    }
}

const getUserOrders=async(req,res)=>{
    try{
        const orders=await orderServices.getUserOrders(req.user._id);
        res.status(200).send(orders);
    }
    catch(error){
        res.status(400).send({message:error.message});
    }
}

const getOrderById=async(req,res)=>{
    try{
        const order=await orderServices.getOrderById(req.params.id);
        res.status(200).send(order);
    }
    catch(error){
        res.status(400).send({message:error.message});
    }
}


// Create an order after successful payment
const createOrderFromCart = async (req, res) => {
    const paymentDetails  = req.body;
    const userId = req.user.id;
    try {
        // Find the user's cart
        const cart = await Cart.findOne({ userId });
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }
console.log(paymentDetails);
        // Create a new order based on cart items
        const order = new Order({
           user_id: userId, 
            order_items: cart.items,
            total_amount: cart.totalPrice,
            order_status: 'Processing',
            order_date: Date.now(),
            payment_method: req.params.payment_method,
            contactInformation: paymentDetails.contactInformation,
            shippingAddress: paymentDetails.shippingAddress,
        });

        await order.save();

        // Clear the cart after order is created
        await Cart.findOneAndDelete({ userId });

        res.status(200).json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).send('Server error');
    }
};



const updateOrder=async(req,res)=>{
    try{
        const result=await orderSchema.validateAsync(req.body);
        const order=await orderServices.updateOrder(req.params.id,result);
        res.status(200).send(order);
    }
    catch(error){
        res.status(400).send({message:error.message});
    }
}


const deleteOrder=async(req,res)=>{
    try{
        const order=await orderServices.deleteOrder(req.params.id);
        res.status(200).send(order);
    }
    catch(error){
        res.status(400).send({message:error.message});
    }
}


module.exports={
    getAllOrders,
    getUserOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    createOrderFromCart
}
