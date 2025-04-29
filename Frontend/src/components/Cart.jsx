import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const phone = localStorage.getItem("phone");
        if (!phone) {
          alert("Please login first");
          return;
        }

        const res = await axios.get(
          `http://localhost:3000/api/cart?phone=${phone}`
        );
        const cart = res.data;

        if (cart.length === 0) {
          alert("Cart is empty");
        } else {
          const filteredItems = cart[0].items.filter(
            (item) => item.menuItemId !== null && item.menuItemId !== undefined
          );
          setCartItems(filteredItems);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  const removeItemFromCart = async (menuItemId) => {
    try {
      const phone = localStorage.getItem("phone");
      if (!phone) {
        alert("Please login first");
        return;
      }

      const response = await axios.delete(
        "http://localhost:3000/api/cart/remove",
        {
          data: { phone, menuItemId },
        }
      );

      if (response.data.message === "Item removed from cart") {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.menuItemId._id !== menuItemId)
        );
        alert("Item removed successfully");
      }
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove item from cart.");
    }
  };

  const handleOrderNow = () => {
    const orderTime = new Date().toLocaleString();
    const deliveryTime = new Date();
    deliveryTime.setMinutes(deliveryTime.getMinutes() + 30); // Estimate delivery time (30 minutes from now)

    const order = {
      items: cartItems,
      total: cartItems.reduce((total, item) => {
        const price = item.menuItemId?.price || 0;
        const quantity = item.quantity || 1;
        return total + price * quantity;
      }, 0),
      orderTime: orderTime,
      deliveryTime: deliveryTime.toLocaleString(),
    };

    // Store order in local storage
    localStorage.setItem("order", JSON.stringify(order));

    // Navigate to orders page
    navigate("/orders");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-4">
      <h2 className="text-4xl font-bold text-center mb-8 text-purple-400">
        Your Cart
      </h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-400">Cart is empty</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((cartItem) => (
              <div
                key={cartItem._id}
                className="bg-white/10 border border-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-red-500/30 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-red-300">
                  {cartItem.menuItemId.name}
                </h3>
                <p className="mt-2">₹{cartItem.menuItemId.price}</p>
                <p className="text-sm text-gray-300">
                  Category: {cartItem.menuItemId.category}
                </p>
                <p className="text-sm text-gray-400 mb-2">
                  {cartItem.menuItemId.description}
                </p>
                <p className="mb-4">Quantity: {cartItem.quantity}</p>
                <button
                  onClick={() => removeItemFromCart(cartItem.menuItemId._id)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
                >
                  Remove from Cart
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <button
              onClick={handleOrderNow}
              className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-xl text-lg font-semibold transition"
            >
              Order Now
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
