const cartServices=require('../../services/cartServices');
const Cart=require('../../models/cart');
const productServices=require('../../services/productServices');
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

// Add item to cart
const addItemToCart = async (req, res) => {
    const  productId = req.body.productId;
    const userId=req.user.id;
    const product=await productServices.getProduct(productId);
    const name=product.name;
    const quantity=1;
    const price=product.price;
    try { 
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }
        const existingItem = cart.items.find(item => item.productId.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } 
        else {
            cart.items.push({ productId, name, quantity, price });
        }
        cart.totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).send('Server error');
    }
};


const increaseQuantity = async (req, res) => {
    const productId = req.params.id;
const userId=req.user.id;
    const quantity = 1;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const item = cart.items.find(item => item.productId.toString() === productId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        item.quantity += quantity;
        cart.totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        await cart.save();
        res.status(200).json(cart);
    }
    catch (error) {
        console.error('Error increasing quantity:', error);
        res.status(500).send('Server error');
    }
}

const decreaseQuantity = async (req, res) => {
    const productId=req.params.id; 
const userId=req.user.id;
    const quantity = 1;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const item = cart.items.find(item => item.productId.toString() === productId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        if (item.quantity < quantity) {
            return res.status(400).json({ message: 'Quantity exceeds the available quantity' });
        }

        item.quantity -= quantity;
        cart.totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        await cart.save();
        res.status(200).json(cart);
    }
    catch (error) {
        console.error('Error decreasing quantity:', error);
        res.status(500).send('Server error');
    }
}


const getCart = async (req, res) => {
    const userId =req.user.id;

    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) {
            return res.status(404).json({ message: 'Cart is empty' });
        }
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).send('Server error');
    }
};


const deleteItemFromCart = async (req, res) => {
    const productId  = req.body.productId;
    const userId=req.user.id;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        cart.items.splice(itemIndex, 1);
        cart.totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error deleting item from cart:', error);
        res.status(500).send('Server error');
    }
};

module.exports={
    addItemToCart,
    increaseQuantity,
    decreaseQuantity,
    getCart,
    deleteItemFromCart,
}

