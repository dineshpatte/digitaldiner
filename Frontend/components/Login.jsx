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
    <div>
      <h2>{mode === "signin" ? "Sign In" : "Sign Up"}</h2>
      <form onSubmit={mode === "signin" ? handleSignin : handleSignup}>
        {mode === "signup" && (
          <>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
          </>
        )}
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">
          {mode === "signin" ? "Sign In" : "Sign Up"}
        </button>
      </form>
      <p>
        {mode === "signin"
          ? "Don't have an account?"
          : "Already have an account?"}
        <button
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
        >
          {mode === "signin" ? "Sign Up" : "Sign In"}
        </button>
      </p>
    </div>
  );
}

export default Login;
