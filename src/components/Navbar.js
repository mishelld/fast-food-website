// components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";

import "./Navbar.css"; // if you want custom styling

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">QuickBite</div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/menu">Menu</Link>
        </li>

        <li>
          <a href="#HowItWorks">How It Works</a>
        </li>
        <li>
          <a href="#Contact">Contact</a>
        </li>
      </ul>

      <div className="navbar-user-buttons">
        <Link to="/cartPage" className="user-button">
          <FontAwesomeIcon icon={faShoppingCart} />
        </Link>
        <Link to="/AuthPage" className="user-button">
          <FontAwesomeIcon icon={faUser} />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
