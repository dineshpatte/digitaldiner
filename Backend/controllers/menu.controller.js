import MenuItem from "../models/menultems.models.js";

export const getMenuItems = async (req, res) => {
  try {
    const { category } = req.query;
    let menuItems;

    if (category) {
      menuItems = await Menuitem.find({ category });
    } else {
      menuItems = await Menuitem.find();
    }

    res.json(menuItems);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ message: "Failed to fetch menu items" });
  }
};

export const createMenuItem = async (req, res) => {
  try {
    const { name, price, category, description, image } = req.body;

    const newItem = new MenuItem({
      name,
      price,
      category,
      description,
      image,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error creating menu item:", error);
    res.status(500).json({ message: "Failed to create menu item" });
  }
};
