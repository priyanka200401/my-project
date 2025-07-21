const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const Wishlist = require('../models/wishlist');
const Product = require('../models/product');



router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const wishlist = await Wishlist.find({ userId })
      .populate('productId'); // Make sure this is here

    const result = wishlist.map(item => ({
      product: item.productId
    }));

    res.json(result);
  } catch (err) {
    console.error("Wishlist fetch error:", err);
    res.status(500).json({ message: 'Server Error' });
  }
});
module.exports = router;
