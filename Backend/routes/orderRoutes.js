import express from "express";
import {
  createOrder,
  getOrdersByPhone,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", createOrder);

router.get("/phone/:phone", getOrdersByPhone);

// In routes/orderRoutes.js
router.get("/", async (req, res) => {
  const { phone } = req.query;
  const orders = await Order.find({ phone });
  res.json(orders);
});

export default router;
