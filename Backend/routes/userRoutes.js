import express from "express";
import {
  createUser,
  getUserByPhone,
  loginUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUser);
router.post("/login", loginUser);
router.get("/phone/:phone", getUserByPhone);

export default router;
