import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "../components/Login";
import Menu from "../components/Menu";
import Cart from "../components/Cart";
import Orders from "../components/Order";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Menu</Link> |<Link to="/cart">Cart</Link> |
          <Link to="/orders">Orders</Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? <Menu /> : <Login setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
