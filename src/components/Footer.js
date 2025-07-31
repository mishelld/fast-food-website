import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
export default function Footer() {
  return (
    <footer id="Contact" className="footer">
      <div className="footer-row">
        <div className="footer-col">
          <h3>QuickBite</h3>
          <p>
            Your favorite food, delivered fast. We connect you with the best
            local restaurants and bring delicious meals right to your doorstep.
          </p>
        </div>

        <div className="footer-col">
          <h1>Quick Links</h1>
          <ul>
            <li>Home</li>
            <li>Menu</li>
            <li>Restaurants</li>
            <li>About Us</li>
            <li>Contact</li>
            <li>Careers</li>
          </ul>
        </div>

        <div className="footer-col">
          <h1>Support</h1>
          <ul>
            <li>Help Center</li>
            <li>Track Your Order</li>
            <li>Delivery Info</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Refund Policy</li>
          </ul>
        </div>

        <div className="footer-col">
          <p>1-800-QUICKBITE</p>
          <p>support@quickbite.com</p>
          <div className="social-icons">
            <a
              href="https://facebook.com/quickbite"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a
              href="https://twitter.com/quickbite"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a
              href="https://instagram.com/quickbite"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
      </div>

      {/* Separator line */}
      <hr className="footer-separator" />

      {/* Bottom bar */}
      <div className="footer-bottom-bar">
        <div className="copyright">© 2025 QuickBite. All rights reserved.</div>
        <div className="legal-links">
          <span>Privacy</span> | <span>Terms</span> | <span>Cookies</span>
        </div>
      </div>
    </footer>
  );
}
