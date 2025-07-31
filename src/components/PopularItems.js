import "./PopularItems.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PopularItems() {
  const [items, setItems] = useState([]); // menu items for selected restaurant
  // user info states
  const [loggedInUserType, setLoggedInUserType] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/api/menu`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => {
        console.error("Failed to fetch menu items:", err);
        setItems([]);
      });
  }, []);

  // Load logged in user info from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("account");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setLoggedInUserType(parsed.type);
        setLoggedInUserData(parsed.data);
        console.log(parsed.data);
      } catch (err) {
        console.error("Failed to parse user from localStorage", err);
      }
    }
  }, []);

  const handleAddtoCart = async (itemId) => {
    try {
      if (!loggedInUserData?.id) {
        alert("Please log in first.");
        return;
      }

      const response = await fetch("http://localhost:3001/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: loggedInUserData.id,
          itemId: itemId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(
          "Failed to add to cart: " + (errorData.message || "Unknown error")
        );
        return;
      }

      const data = await response.json();

      alert("Added to cart!");
      // Optionally, update your cart state here if you have one
      // setCart(data.cart);
    } catch (error) {
      alert("Network error, please try again later.");
      console.error(error);
    }
  };

  return (
    <section className="full-width-section">
      <section className="popular-section">
        <h2>Most Popular Items</h2>
        <p>
          Discover what everyone's ordering. These crowd favorites are flying
          off the virtual shelves!
        </p>
        <div className="popular-grid">
          {items.map((item, index) => (
            <div key={index} className="popular-card">
              <h3>{item.name}</h3>
              {/* Image */}
              {item.imageUrl && (
                <>
                  {console.log(
                    "Image URL:",
                    `http://localhost:3001${item.imageUrl}`
                  )}
                  <img
                    src={`http://localhost:3001${item.imageUrl}`} // prepend your server base URL
                    alt={item.name}
                    className="menu-item-image"
                  />
                </>
              )}
              <p className="price">{item.price}</p>
              <p className="restaurant">{item.restaurant}</p>
              <div className="details"></div>
              <button
                className="add-to-cart"
                onClick={() => handleAddtoCart(item._id)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <button
          className="view-all"
          onClick={() => navigate("/menu")} // replace "/menu" with your actual route
        >
          View All Menu Items
        </button>{" "}
      </section>
    </section>
  );
}

export default PopularItems;
