const express = require('express');
const router = express.Router();
const Product = require('../models/product'); // ✅ Your Product model

// ✅ Existing route (likely POST or GET all products) above

// ✅ NEW: Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
