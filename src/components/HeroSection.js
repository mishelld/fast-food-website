import React from "react";
import "./HeroSection.css";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import FoodImage from "../assets/food.png"; // your image path
import { Link } from "react-router-dom";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <>
      <div id="home" className="container">
        <div className="left-side">
          <h1 className="title">Delicious Food</h1>
          <h1 className="title title2">Delivered Fast</h1>

          <p className="subtitle">
            Craving your favorite meal? Get it delivered hot and fresh to your
            doorstep in under 30 minutes. Order from hundreds of local
            restaurants with just a few taps.
          </p>
          <div className="button-group">
            <button
              className="button"
              onClick={() => navigate("/cartPage")} // replace "/menu" with your actual route
            >
              Order Now
            </button>
            <button
              className="button outline"
              onClick={() => navigate("/menu")} // replace "/menu" with your actual route
            >
              View Manu
            </button>
          </div>
          <div className="info-row">
            <div className="info-item">
              <div className="info-number">500+</div>
              <div className="info-label">Restaurants</div>
            </div>
            <div className="info-item">
              <div className="info-number">30 min</div>
              <div className="info-label">Avg Delivery</div>
            </div>
            <div className="info-item">
              <div className="info-number">50k+</div>
              <div className="info-label">Happy Customers</div>
            </div>
          </div>
        </div>
        <div className="right-side">
          <img src={FoodImage} alt="food" className="image" />
        </div>
      </div>
    </>
  );
}
export default HeroSection;
