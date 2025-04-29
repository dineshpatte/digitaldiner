import Cart from "../models/cart.model.js";
import mongoose from "mongoose";

export const getCartItems = async (req, res) => {
  try {
    const phone = req.query.phone;
    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    const cartItems = await Cart.find({ phone }).populate(
      "items.menuItemId",
      "name price category description"
    );

    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({ message: "No items in cart" });
    }

    res.json(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Failed to fetch cart items" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { phone, menuItemId, quantity = 1 } = req.body;

    console.log("Request data:", req.body);

    if (!phone || !menuItemId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!mongoose.Types.ObjectId.isValid(menuItemId)) {
      return res.status(400).json({ message: "Invalid menuItemId" });
    }

    let cart = await Cart.findOne({ phone });

    if (!cart) {
      cart = new Cart({ phone, items: [] });
      console.log("Creating a new cart for phone:", phone);
    }

    const existingItem = cart.items.find(
      (item) => item.menuItemId.toString() === menuItemId
    );

    if (existingItem) {
      console.log("Item already exists, updating quantity");
      existingItem.quantity += quantity;
    } else {
      console.log("Adding new item to cart");
      cart.items.push({ menuItemId, quantity, phone });
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    console.error("Error adding item to cart:", error.message);
    res
      .status(500)
      .json({ message: "Failed to add item to cart", error: error.message });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const { phone, menuItemId } = req.body;

    const cart = await Cart.findOne({ phone });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    console.log("Cart Items: ", cart.items);
    console.log("Item to remove: ", menuItemId);

    const itemIndex = cart.items.findIndex(
      (item) => item.menuItemId.toString() === menuItemId.toString()
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    cart.items.splice(itemIndex, 1);

    await cart.save();
    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Failed to remove item from cart" });
  }
};
