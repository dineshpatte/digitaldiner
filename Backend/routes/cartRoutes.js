import express from "express";
import {
  addToCart,
  removeCartItem,
  getCartItems,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", getCartItems);

router.post("/add", addToCart);

router.delete("/remove", removeCartItem);

export default router;
