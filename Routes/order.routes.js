
const express = require('express');
const Orderrouter = express.Router();
const {OrderModel} = require('../Model/order.model');
const {CartModel} = require('../Model/cart.model');
const {authMiddleware}=require('../Middleware/Auth.middleware');
const { CartItemModel } = require('../Model/cartItem.model');

Orderrouter.post('/orders/place', authMiddleware, async (req, res) => {
  try {
    const userId = req.body.user._id;
    const cart = await CartModel.findOne({ user: userId }).populate('items.product');
    const cartdata=await CartItemModel.find()
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty. Add products to your cart before placing an order.' });
    }
    const order = new OrderModel({
      user: userId,
     
        product: cartdata.product,
        quantity: cartdata.quantity,
    });
    await order.save();
    res.json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to place the order' });
  }
});

module.exports = {Orderrouter};
