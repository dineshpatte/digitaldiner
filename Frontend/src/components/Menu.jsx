import React, { useEffect, useState } from "react";
import axios from "axios";

function Menu() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/menu");
        const itemsWithImages = res.data.filter(
          (item) =>
            item.image && item.image.trim() !== "" && isValidImage(item.image)
        );
        setMenuItems(itemsWithImages);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };
    fetchMenu();
  }, []);

  const isValidImage = (url) => {
    const image = new Image();
    image.src = url;
    return image.complete && image.naturalHeight !== 0;
  };

  const addToCart = async (item) => {
    try {
      const phone = localStorage.getItem("phone");
      if (!phone) {
        alert("Please login first");
        return;
      }
      const quantity = 1;
      await axios.post("http://localhost:3000/api/cart/add", {
        phone,
        menuItemId: item._id,
        quantity,
      });
      alert("Item added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-4">
      <h2 className="text-4xl font-bold text-center mb-8 text-purple-400">
        Our Menu
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div
            key={item._id}
            className="bg-white/10 border border-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-purple-500/40 transition-all duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-purple-300">
              {item.name}
            </h3>
            <p className="text-white mt-2">₹{item.price}</p>
            <p className="text-sm text-gray-300 mb-4">
              Category: {item.category}
            </p>
            <button
              onClick={() => addToCart(item)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
