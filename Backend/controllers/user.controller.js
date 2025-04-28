import User from "../models/user.models.js";

export const createUser = async (req, res) => {
  console.log("Request body:", req.body);
  try {
    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: "Not given all details" });
    }

    let user = await User.findOne({ phone });

    if (user) {
      return res.status(200).json({ message: "User already exists" });
    }

    user = await User.create({ name, phone });

    res.status(201).json({ message: "User created", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ message: "Failed to create user", error: error.message });
  }
};

export const getUserByPhone = async (req, res) => {
  try {
    const { phone } = req.params;

    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Failed to fetch user" });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    const user = await User.findOne({ phone });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Please sign up." });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Failed to login" });
  }
};
