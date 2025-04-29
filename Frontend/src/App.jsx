import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./components/Login";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import Orders from "./components/Order";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-700 text-white">
        {/* Navbar */}
        <nav className="bg-opacity-90 bg-black text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
              RestaurantApp
            </h1>

            <div className="space-x-6 hidden md:flex">
              <Link
                to="/"
                className="text-white hover:text-purple-400 transition duration-300 font-bold text-xl"
              >
                Menu
              </Link>
              <Link
                to="/cart"
                className="text-white hover:text-purple-400 transition duration-300 font-bold text-xl"
              >
                Cart
              </Link>
              <Link
                to="/orders"
                className="text-white hover:text-purple-400 transition duration-300 font-bold text-xl"
              >
                Orders
              </Link>
            </div>
          </div>
        </nav>

        {/* Routes */}
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
