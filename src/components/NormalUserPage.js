import React from "react";
import { useNavigate } from "react-router-dom";

function NormalUserPage() {
  const navigate = useNavigate();

  const account = JSON.parse(localStorage.getItem("account"));

  const handleLogout = () => {
    localStorage.removeItem("account");
    alert("Logged out!");
    navigate("/login"); // or back to "/"
  };

  if (!account) {
    return <p>Redirecting...</p>;
  }

  return (
    <div className="auth-container">
      <h2>Welcome, {account.data.name}!</h2>
      <p>You are logged in as a {account.type}</p>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default NormalUserPage;
