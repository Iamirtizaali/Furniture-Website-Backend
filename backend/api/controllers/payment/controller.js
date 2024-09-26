
const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY);
const Cart = require('../../models/cart');

const createCheckoutSession=async (req, res) => {
  
    try {
        const  cartItems  =await Cart.findOne({userId:req.user.id});  // Expecting the cartItems array from the frontend request
        console.log(cartItems);
        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: cartItems.items.map(item => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        description: item.description,
                    },
                    unit_amount: item.price*100,  // amount in cents
                },
                quantity: item.quantity,
            })),
            mode: 'payment',
            success_url: `${req.protocol}://${req.get('host')}/api/payment/payment-success`,
            cancel_url: `${req.protocol}://${req.get('host')}/api/payment/payment-cancel`,
        });

        res.json({ id: session.url });
    } catch (error) {
        console.error('Error creating Stripe session:', error);
        res.status(500).send('Internal Server Error');
    }
}

const paymentSuccess=(req, res) => {
    // Payment successful logic here (e.g., marking order as paid in DB)
    res.send('Payment successful!');
}

const paymentCancel=(req, res) => {
    // Payment cancel logic here
    res.send('Payment canceled!');
}


module.exports = {
    createCheckoutSession,
    paymentSuccess,
    paymentCancel
}