import Cart from "../models/cart.model.js";

export const getCartItems = async (req, res) => {
  try {
    const phone = req.query.phone; // Or any other way you want to fetch the phone or user
    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    // Fetch cart items for the user
    const cartItems = await Cart.find({ phone }); // Make sure Cart model and data are set up properly

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
    const { phone, menuItemId, quantity } = req.body;

    let cart = await Cart.findOne({ phone });

    if (!cart) {
      cart = new Cart({ phone, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.menuItemId.toString() === menuItemId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ menuItemId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Failed to add item to cart" });
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

    const itemIndex = cart.items.findIndex(
      (item) => item.menuItemId.toString() === menuItemId
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
