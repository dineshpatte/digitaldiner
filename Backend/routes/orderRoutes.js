import express from "express";
import {
  createOrder,
  getOrdersByPhone,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", createOrder);

router.get("/phone/:phone", getOrdersByPhone);

export default router;
