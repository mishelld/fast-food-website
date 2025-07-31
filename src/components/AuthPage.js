import React, { useState, useEffect } from "react";
import "./AuthPage.css";
import { useNavigate } from "react-router-dom"; // React Router v6

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loggedInUser, setLoggedInUser] = useState(null);

  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const storedAccount = localStorage.getItem("account"); // key stays same if you want
    if (storedAccount) {
      try {
        const parsedAccount = JSON.parse(storedAccount);
        setLoggedInUser(parsedAccount); // now loggedInUser will have { type, data }
        console.log(parsedAccount);
      } catch (err) {
        console.error("Failed to parse user from localStorage", err);
        localStorage.removeItem("user"); // Clear bad data
        navigate("/");
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const url = isLogin
      ? "http://localhost:3001/api/auth/login"
      : "http://localhost:3001/api/auth/signup";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      if (isLogin) {
        alert("Logged in successfully!");

        // Save both the type and the account data
        localStorage.setItem(
          "account",
          JSON.stringify({
            type: data.type,
            data: data.user || data.restaurant,
          })
        );

        window.location.href = "/"; // or React Router navigation
      } else {
        alert("Signed up successfully! Please login.");
        setIsLogin(true); // switch to login form after signup
      }
    } catch (err) {
      alert("Error connecting to server");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoggedInUser(null);
    alert("Logged out!");
  };

  // ✅ If logged in, show logout page
  if (loggedInUser) {
    return (
      <div className="logout-page">
        <div className="logout-card">
          <h2>👋 Welcome, {loggedInUser.data.name}!</h2>
          <p>You are successfully logged in.</p>
          <button className="logout-button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Restaurant Login" : "Restaurant Sign Up"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Restaurant Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Restaurant Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {!isLogin && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        )}
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>

      <p className="toggle-text">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button onClick={() => setIsLogin(!isLogin)} className="toggle-btn">
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
}

export default AuthPage;
