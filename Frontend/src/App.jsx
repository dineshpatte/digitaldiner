import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { ShoppingCart, List, Receipt } from "lucide-react";
import Login from "./components/Login";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import Orders from "./components/Order";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-700 text-white flex flex-col">
        {/* Desktop Navbar */}
        <nav className="bg-opacity-90 bg-black text-white shadow-lg hidden md:block">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
              DigitalDiner
            </h1>
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

        {/* Mobile Header (place above main content) */}
        <header className="md:hidden bg-black text-center py-3">
          <h1 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
            DigitalDiner
          </h1>
        </header>

        {/* Main Routes */}
        <div className="flex-grow pb-16">
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Menu setCartCount={setCartCount} />
                ) : (
                  <Login setIsLoggedIn={setIsLoggedIn} />
                )
              }
            />
            <Route
              path="/cart"
              element={<Cart setCartCount={setCartCount} />}
            />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>

        {/* Mobile Footer */}
        <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-black/90 text-white shadow-inner flex justify-around items-center py-3">
          <Link to="/" className="flex flex-col items-center text-purple-400">
            <List className="w-6 h-6" />
            <span className="text-xs mt-1">Menu</span>
          </Link>
          <Link
            to="/orders"
            className="flex flex-col items-center text-purple-400"
          >
            <Receipt className="w-6 h-6" />
            <span className="text-xs mt-1">Orders</span>
          </Link>
          <Link
            to="/cart"
            className="relative flex flex-col items-center text-purple-400"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
            <span className="text-xs mt-1">Cart</span>
          </Link>
        </footer>
      </div>
    </Router>
  );
}

export default App;
