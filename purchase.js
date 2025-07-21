const express = require('express');
const router = express.Router();
const Purchase = require('../models/purchase');
const authenticateToken = require('../middleware/auth'); // JWT middleware

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    const purchase = new Purchase({ userId, productId });
    await purchase.save();

    res.json({ message: 'Product purchased successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to complete purchase' });
  }
});

router.get('/my', authenticateToken, async (req, res) => {
  try {
    const purchases = await Purchase.find({ userId: req.user.id }).populate('productId');
    res.json(purchases);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  const product = req.body;

  // Simulate saving product to database or order
  console.log('✅ Product ordered by:', req.user.email || req.user.username);
  console.log('🛍️ Product:', product);

  res.status(200).json({ message: 'Product purchased successfully' });
});

const Order = require('../models/order');

router.post('/', authenticateToken, async (req, res) => {
  try {
    const product = req.body;

    const newOrder = new Order({
      userId: req.user.id,
      product: {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        brand: product.brand,
        category: product.category,
        rating: product.rating,
        description: product.description
      }
    });

    await newOrder.save();

    res.status(200).json({ message: '🛍️ Product purchased and stored in order history.' });
  } catch (err) {
    console.error('Order saving error:', err);
    res.status(500).json({ error: 'Failed to process order' });
  }
});

module.exports = router;
