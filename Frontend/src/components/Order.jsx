import React from "react";
import { useNavigate } from "react-router-dom";

function Orders() {
  const navigate = useNavigate();

  const order = JSON.parse(localStorage.getItem("order")) || {};

  if (!order.items || order.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-4">
        <h2 className="text-4xl font-bold text-center mb-8 text-purple-400">
          No Order Found
        </h2>
        <p className="text-center text-gray-400">
          Please place an order first.
        </p>
      </div>
    );
  }

  const { items, total, orderTime, deliveryTime } = order;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-4">
      <h2 className="text-4xl font-bold text-center mb-8 text-purple-400">
        Order Summary
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white/10 border border-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-red-500/30 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-red-300">
              {item.menuItemId?.name}
            </h3>
            <p className="text-white mt-2">Price: ₹{item.menuItemId?.price}</p>
            <p className="text-sm text-gray-300">Quantity: {item.quantity}</p>
            <p className="text-sm text-gray-400 mb-4">
              Subtotal: ₹{item.menuItemId?.price * item.quantity}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center mt-10 space-y-4">
        <p className="text-lg text-gray-300">🕒 Order Time: {orderTime}</p>
        <h3 className="text-2xl text-white font-semibold">
          Final Total: ₹{total}
        </h3>
        <p className="text-lg text-gray-300">Delivery Time: {deliveryTime}</p>
        <button
          onClick={() => navigate("/")}
          className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-xl text-lg font-semibold transition"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
}

export default Orders;
