const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const authenticateToken = require('../middleware/authenticateToken');
const Order = require('../models/Order');

// Place an order
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user.id;

    const newOrder = new Order({
      userId,
      productId: mongoose.Types.ObjectId(productId),
      quantity
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully!', order: newOrder });
  } catch (err) {
    console.error('Order placement failed:', err);
    res.status(500).json({ message: 'Failed to place order' });
  }
});

// Get user's orders
router.get('/', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate('productId');
    res.json(orders);
  } catch (err) {
    console.error('Error loading orders:', err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

module.exports = router;
