import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import Login from "./components/Login";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import Orders from "./components/Order";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-700 text-white">
        {/* Navbar */}
        <nav className="bg-opacity-90 bg-black text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
              DigitalDiner
            </h1>

            {/* Hamburger */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-white focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            {/* Desktop nav */}
            <div className="space-x-6 hidden md:flex items-center gap-10">
              <Link
                to="/"
                className="text-white hover:text-purple-400 transition font-bold text-xl"
              >
                Menu
              </Link>
              <Link
                to="/orders"
                className="text-white hover:text-purple-400 transition font-bold text-xl"
              >
                Orders
              </Link>
              <Link
                to="/cart"
                className="relative hover:text-purple-400 transition"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </nav>

        {isMenuOpen && (
          <div className="md:hidden bg-black text-white space-y-8 py-4 px-8">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block text-xl font-bold text-purple-400"
            >
              Menu
            </Link>
            <Link
              to="/orders"
              onClick={() => setIsMenuOpen(false)}
              className="block text-xl font-bold text-purple-400"
            >
              Orders
            </Link>
            <Link
              to="/cart"
              onClick={() => setIsMenuOpen(false)}
              className="block text-purple-400 relative"
            >
              <ShoppingCart className="w-6 h-6 inline-block" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        )}

        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? <Menu /> : <Login setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route path="/cart" element={<Cart setCartCount={setCartCount} />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
