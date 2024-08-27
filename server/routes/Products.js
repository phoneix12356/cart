const express = require('express');
const Product = require('../models/Product');
const axios = require('axios');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await axios.get("https://fakestoreapi.com/products");
   
    res.json(products.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
});

// Get a single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product' });
  }
});

// Add more routes for creating, updating, and deleting products as needed

module.exports = router;