const Order = require("../models/order");
const User=require('../models/user');
const Product=require('../models/product');

const addOrder = async (order) => {
    try {
        return await Order.create(order);
    }
    catch (error) {
        throw new Error(error);
    }
}

const getOrder = async (id) => {
    try {
        return await Order.findById(id);
    }
    catch (error) {
        throw new Error(error);
    }
}

const updateOrder = async (id, update) => {
    try {
        return await Order.findByIdAndUpdate(id, update, { new: true });
    }
    catch (error) {
        throw new Error(error);
    }
}

const deleteOrder = async (id) => {
    try {
        return await Order.findByIdAndDelete(id);
    }
    catch (error) {
        throw new Error(error);
    }
}

const getAllOrders = async () => {
    try {
        return await Order.find();
    }
    catch (error) {
        throw new Error(error);
    }
}

const getOrderByUserId = async (user_id) => {
    try {
        return await Order.find({ user_id: user_id });
    }
    catch (error) {
        throw new Error(error);
    }
}

const addOrderItem = async (id, product_id, quantity) => {
    try {
        const product = await Product.findById(product_id);
        const order = await Order.findById(id);
        const user = await User.findById(order.user_id);
        const order_item = {
            product_id: product_id,
            quantity: quantity,
            price: product.price,
        }
        order.order_items.push(order_item);
        order.total_amount += product.price * quantity;
        user.orders.push(order._id);
        await order.save();
        await user.save();
        return order;
    }
    catch (error) {
        throw new Error(error);
    }
}

const deleteOrderItem = async (id, product_id) => {
    try {
        const order = await Order.findById(id);
        const user = await User.findById(order.user_id);
        const product = await Product.findById(product_id);
        const order_item = order.order_items.find(order_item => order_item.product_id == product_id);
        order.total_amount -= order_item.price * order_item.quantity;
        order.order_items = order.order_items.filter(order_item => order_item.product_id != product_id);
        user.orders = user.orders.filter(order_id => order_id != id);
        await order.save();
        await user.save();
        return order;
    }
    catch (error) {
        throw new Error(error);
    }
}



module.exports = {
    addOrder,
    getOrder,
    updateOrder,
    deleteOrder,
    getAllOrders,
    getOrderByUserId,
    addOrderItem,
    deleteOrderItem,
}