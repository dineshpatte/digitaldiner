import User from "./models/user.models.js";

export const createUser = async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: "not given all details" });
    }

    let user = await User.findOne({ phone });

    if (user) {
      return res.status(200).json({ message: "user already exist" });
    }

    user = await User.create({ name, phone });

    res.status(201).json({ message: "user created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to create" });
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
