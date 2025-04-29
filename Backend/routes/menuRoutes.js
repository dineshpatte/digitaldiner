import express from "express";
import {
  getMenuItems,
  createMenuItem,
} from "../controllers/menu.controller.js";

const router = express.Router();

// routes/menuRoutes.js
router.post("/bulk-add", async (req, res) => {
  try {
    await MenuItem.insertMany(req.body);
    res.status(200).json({ message: "Bulk insert successful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Bulk insert failed", error: error.message });
  }
});

router.get("/", getMenuItems);

router.post("/", createMenuItem);

export default router;
