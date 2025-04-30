import React, { useEffect, useState } from "react";
import axios from "axios";

function Menu({ setCartCount }) {
  const [menuItems, setMenuItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/menu`
        );
        const itemsWithImages = res.data.filter(
          (item) =>
            item.image && item.image.trim() !== "" && isValidImage(item.image)
        );
        setMenuItems(itemsWithImages);

        const initialQuantities = {};
        itemsWithImages.forEach((item) => {
          initialQuantities[item._id] = 1;
        });
        setQuantities(initialQuantities);

        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching menu items:", error);
        setLoading(false); // Ensure loading is set to false if there's an error
      }
    };
    fetchMenu();
  }, []);

  const isValidImage = (url) => {
    const image = new Image();
    image.src = url;
    return image.complete && image.naturalHeight !== 0;
  };

  const handleQuantityChange = (itemId, delta) => {
    setQuantities((prev) => {
      const newQty = Math.max(1, (prev[itemId] || 1) + delta);
      return { ...prev, [itemId]: newQty };
    });
  };

  const addToCart = async (item) => {
    try {
      const phone = localStorage.getItem("phone");
      if (!phone) {
        alert("Please login first");
        return;
      }
      const quantity = quantities[item._id] || 1;
      await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/cart/add`, {
        phone,
        menuItemId: item._id,
        quantity,
      });

      // Fetch updated cart count
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart?phone=${phone}`
      );
      const validItems =
        res.data[0]?.items?.filter((item) => item.menuItemId !== null) || [];
      setCartCount(validItems.length);

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

      {/* Show loading bar while data is being fetched */}
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="w-24 h-24 border-4 border-t-4 border-purple-400 border-solid rounded-full animate-spin"></div>{" "}
          {/* Spinning loader */}
        </div>
      ) : (
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

              <div className="flex items-center justify-center mb-3">
                <button
                  onClick={() => handleQuantityChange(item._id, -1)}
                  className="px-3 py-1 text-xl bg-red-500 hover:bg-red-600 rounded-l"
                >
                  –
                </button>
                <div className="px-4 py-1 bg-gray-800 text-white text-lg">
                  {quantities[item._id] || 1}
                </div>
                <button
                  onClick={() => handleQuantityChange(item._id, 1)}
                  className="px-3 py-1 text-xl bg-green-500 hover:bg-green-600 rounded-r"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => addToCart(item)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Menu;
