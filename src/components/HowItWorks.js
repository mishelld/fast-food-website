import React from "react";
import "./HowItWorks.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCartShopping,
  faMapMarkerAlt,
  faSmile,
} from "@fortawesome/free-solid-svg-icons";

const HowItWorks = () => {
  return (
    <section id="HowItWorks" className="how-it-works-section">
      <h2 className="section-title">How It Works</h2>
      <p className="section-description">
        Getting your favorite food delivered is easier than ever. Just follow
        these simple steps and enjoy restaurant-quality meals from the comfort
        of your home.
      </p>

      <div className="how-it-works-grid">
        <div className="step-card">
          <div className="step-number">01</div>
          <FontAwesomeIcon icon={faMagnifyingGlass} className="step-icon" />

          <h3>Browse & Choose</h3>
          <p>
            Explore hundreds of restaurants and thousands of dishes. Filter by
            cuisine, price, or dietary preferences to find exactly what you're
            craving.
          </p>
        </div>
        <div className="step-card">
          <div className="step-number">02</div>
          <FontAwesomeIcon icon={faCartShopping} className="step-icon" />

          <h3>Place Your Order</h3>
          <p>
            Add items to your cart, customize your order, and choose your
            preferred payment method. Our secure checkout takes just seconds.
          </p>
        </div>
        <div className="step-card">
          <div className="step-number">03</div>
          <FontAwesomeIcon icon={faMapMarkerAlt} className="step-icon" />

          <h3>Track Your Delivery</h3>
          <p>
            Watch your order come to life! Get real-time updates from
            preparation to pickup, and track your delivery driver's location on
            the map.
          </p>
        </div>
        <div className="step-card">
          <div className="step-number">04</div>
          <FontAwesomeIcon icon={faSmile} className="step-icon" />

          <h3>Enjoy Your Meal</h3>
          <p>
            Your delicious meal arrives hot and fresh at your doorstep. Rate
            your experience and reorder your favorites with just one tap!
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
