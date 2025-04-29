import Cart from "../models/cart.model.js";
import mongoose from "mongoose";

// cart.controller.js
export const getCartItems = async (req, res) => {
  try {
    const phone = req.query.phone; // Fetch phone from query params
    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    // Fetch cart items for the user, populating the menuItemId field
    const cartItems = await Cart.find({ phone }).populate(
      "items.menuItemId",
      "name price category description"
    ); // Populate the relevant fields

    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({ message: "No items in cart" });
    }

    res.json(cartItems); // Send the cart items back to the client
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Failed to fetch cart items" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { phone, menuItemId, quantity = 1 } = req.body;

    console.log("Request data:", req.body);

    // Validate required fields
    if (!phone || !menuItemId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Ensure that menuItemId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(menuItemId)) {
      return res.status(400).json({ message: "Invalid menuItemId" });
    }

    let cart = await Cart.findOne({ phone });

    if (!cart) {
      cart = new Cart({ phone, items: [] });
      console.log("Creating a new cart for phone:", phone);
    }

    // Check if the item already exists in the cart
    const existingItem = cart.items.find(
      (item) => item.menuItemId.toString() === menuItemId
    );

    if (existingItem) {
      // If the item exists, update the quantity
      console.log("Item already exists, updating quantity");
      existingItem.quantity += quantity;
    } else {
      // If the item doesn't exist, add it to the cart
      console.log("Adding new item to cart");
      cart.items.push({ menuItemId, quantity, phone });
    }

    // Save the cart with the updated or new item
    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    console.error("Error adding item to cart:", error.message);
    res
      .status(500)
      .json({ message: "Failed to add item to cart", error: error.message });
  }
};

// Remove item from cart
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
      (item) => item.menuItemId.toString() === menuItemId.toString() // Ensure proper conversion
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
