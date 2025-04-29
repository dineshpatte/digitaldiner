import React, { useEffect, useState } from "react";
import axios from "axios";

function Menu({ setCart }) {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/menu");
        setMenuItems(res.data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };
    fetchMenu();
  }, []);

  const addToCart = async (item) => {
    try {
      const phone = localStorage.getItem("phone");
      if (!phone) {
        alert("Please login first");
        return;
      }
      await axios.post("http://localhost:3000/api/cart", {
        phone,
        itemId: item._id,
      });
      alert("Item added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div>
      <h2>Menu</h2>
      {menuItems.map((item) => (
        <div
          key={item._id}
          style={{ border: "1px solid black", margin: "10px", padding: "10px" }}
        >
          <h3>{item.name}</h3>
          <p>Price: ₹{item.price}</p>
          <p>Category: {item.category}</p>
          <button onClick={() => addToCart(item)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default Menu;
