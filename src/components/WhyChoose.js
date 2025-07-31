import React from "react";
import "./WhyChoose.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faCheckCircle,
  faMapMarkerAlt,
  faTags,
  faMobileAlt,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";

function WhyChoose() {
  return (
    <section id="WhyChoose" className="why-choose">
      <h2 className="section-title">Why Choose QuickBite?</h2>
      <p className="section-description">
        We're not just another food delivery app. We're your gateway to the best
        dining experience, delivered right to your door with unmatched speed and
        quality.
      </p>
      <div className="features-grid">
        <div className="feature-card">
          <FontAwesomeIcon icon={faBolt} className="feature-icon" />

          <h3>Lightning Fast Delivery</h3>
          <p>
            Get your food delivered in under 30 minutes with our optimized
            delivery network and real-time tracking.
          </p>
        </div>
        <div className="feature-card">
          <FontAwesomeIcon icon={faCheckCircle} className="feature-icon" />

          <h3>Quality Guaranteed</h3>
          <p>
            We partner with the best restaurants and ensure every meal meets our
            high standards for freshness and taste.
          </p>
        </div>
        <div className="feature-card">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="feature-icon" />

          <h3>Wide Coverage Area</h3>
          <p>
            We deliver to every corner of the city. No matter where you are,
            delicious food is just a tap away.
          </p>
        </div>
        <div className="feature-card">
          <FontAwesomeIcon icon={faTags} className="feature-icon" />

          <h3>Best Prices</h3>
          <p>
            Enjoy competitive prices with no hidden fees. Plus, get exclusive
            deals and discounts on your favorite meals.
          </p>
        </div>
        <div className="feature-card">
          <FontAwesomeIcon icon={faMobileAlt} className="feature-icon" />

          <h3>Easy Ordering</h3>
          <p>
            Our intuitive app makes ordering a breeze. Save your favorites,
            reorder with one tap, and track your delivery live.
          </p>
        </div>
        <div className="feature-card">
          <FontAwesomeIcon icon={faHeadset} className="feature-icon" />

          <h3>24/7 Support</h3>
          <p>
            Our customer support team is always here to help. Get assistance
            anytime, day or night, for a seamless experience.
          </p>
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;
