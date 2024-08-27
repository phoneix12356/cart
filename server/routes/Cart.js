const express = require("express");
const Cart = require("../models/Cart");
const auth = require("../middleware/auth");

const router = express.Router();


router.get("/", auth, async (req, res) => {
  try {
    
    let cart = await Cart.findOne({ user: req.user.userId });
   
    if (!cart) {
      cart = new Cart({ user: req.user.userId, items: [] });
      await cart.save();
    }
    res.json(cart.items);
  } catch (error) {
    res.status(500).json({ error: "Error fetching cart" });
  }
});


router.post("/add", auth, async (req, res) => {
  try {
    const { product, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user.userId });

    if (!cart) {
      cart = new Cart({ user: req.user.userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.id === product.id
    );

    if (itemIndex === -1) {
      cart.items.push({
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
        stock: quantity
      });
    } else {
      cart.items[itemIndex].stock += Number(quantity);
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    
    res.status(500).json({ error: "Error adding item to cart" });
  }
});

router.delete("/delete/:productId", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.id.toString() !== req.params.productId
    );

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error removing item from cart" });
  }
});

module.exports = router;
