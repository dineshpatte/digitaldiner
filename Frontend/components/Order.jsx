import React, { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const phone = localStorage.getItem("phone");
        const res = await axios.get(
          `http://localhost:3000/api/orders/${phone}`
        );
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid black",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>Order ID: {order._id}</h3>
            <p>Items: {order.items.length} items</p>
            <p>Total: ₹{order.total}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
