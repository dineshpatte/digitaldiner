import React, { useState } from "react";

function Login({ setIsLoggedIn }) {
  const [mode, setMode] = useState("signin");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    if (!username || !phone || !password) {
      alert("All fields required");
      return;
    }

    const userData = { username, phone, password };
    localStorage.setItem("userData", JSON.stringify(userData));
    alert("Signup successful. You can now log in.");
    setMode("signin");
  };

  const handleSignin = (e) => {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem("userData"));

    if (!savedUser) {
      alert("No account found. Please sign up first.");
      return;
    }

    if (savedUser.phone === phone && savedUser.password === password) {
      localStorage.setItem("username", savedUser.username);
      localStorage.setItem("phone", savedUser.phone);
      localStorage.setItem("password", savedUser.password);
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-purple-900 to-black p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20 text-white">
        <h2 className="text-3xl font-bold text-center mb-6">
          {mode === "signin" ? "Sign In" : "Sign Up"}
        </h2>
        <form
          onSubmit={mode === "signin" ? handleSignin : handleSignup}
          className="space-y-4"
        >
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
          )}
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            {mode === "signin" ? "Sign In" : "Sign Up"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm">
          {mode === "signin"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="text-purple-400 hover:underline ml-1 transition"
          >
            {mode === "signin" ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
