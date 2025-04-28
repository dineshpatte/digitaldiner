import Order from "./models/orders.model.js";

export const createOrder = async (req, res) => {
  try {
    const { name, phone, cart } = req.body;

    if (!name || !phone || !cart || !cart.length) {
      return res.status(400).json({ message: "Missing required order fields" });
    }

    const newOrder = await Order.create({
      name,
      phone,
      cart,
    });

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Failed to place order" });
  }
};

export const getOrdersByPhone = async (req, res) => {
  try {
    const { phone } = req.params;

    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    const orders = await Order.findAll({
      where: { phone },
    });

    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this phone number" });
    }

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
