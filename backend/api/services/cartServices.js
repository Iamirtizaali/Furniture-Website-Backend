const Cart = require('../models/cart'); // Assuming you created a cart model

// Add item to cart
const addItemToCart = async (req, res) => {
    const { userId, productId, name, quantity, price } = req.body;

    try {
        let cart = await Cart.findOne({ userId });

        // If the cart doesn't exist, create one
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        // Check if item already exists in the cart
        const existingItem = cart.items.find(item => item.productId.toString() === productId);

        if (existingItem) {
            // Update the quantity if the item exists
            existingItem.quantity += quantity;
        } else {
            // Add new item to the cart
            cart.items.push({ productId, name, quantity, price });
        }

        // Update total price
        cart.totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).send('Server error');
    }
};



module.exports = {
    addItemToCart,
};