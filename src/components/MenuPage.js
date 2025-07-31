import React, { useState, useEffect } from "react";
import "./MenuPage.css";

function MenuPage() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [items, setItems] = useState([]); // menu items for selected restaurant

  // user info states
  const [loggedInUserType, setLoggedInUserType] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);

  // Add item form state
  const [addingItem, setAddingItem] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    tag: "",
    price: "",
    rating: "",
    deliveryTime: "",
    restaurantName: "",
    image: null, // New field for the uploaded file
  });

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

  // Fetch restaurants on mount
  useEffect(() => {
    fetch("http://localhost:3001/api/restaurants")
      .then((res) => res.json())
      .then((data) => setRestaurants(data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch menu items whenever selectedRestaurant changes
  useEffect(() => {
    if (!selectedRestaurant) {
      setItems([]);
      return;
    }

    fetch(`http://localhost:3001/api/menu/${selectedRestaurant._id}`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => {
        console.error("Failed to fetch menu items:", err);
        setItems([]);
      });
  }, [selectedRestaurant]);

  // Form input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  }

  // Add new menu item
  async function handleAddItem() {
    if (!newItem.name || !newItem.price || !loggedInUserData?.id) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", newItem.name);
      formData.append("price", newItem.price);
      formData.append("restaurantId", loggedInUserData.id);
      formData.append("restaurantName", loggedInUserData.name);
      if (newItem.image) {
        formData.append("image", newItem.image);
      }

      const response = await fetch("http://localhost:3001/api/menu/add", {
        method: "POST",
        body: formData, // Don't set headers manually here
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert("Error: " + (errorData.message || "Failed to add item"));
        return;
      }

      const data = await response.json();

      setItems((prev) => [...prev, data.item]);

      // Reset form
      setNewItem({
        name: "",
        tag: "",
        price: "",
        rating: "",
        deliveryTime: "",
        restaurantName: "",
        image: null,
      });
      setAddingItem(false);
    } catch (error) {
      alert("Network error, please try again later.");
      console.error(error);
    }
  }

  const handleDelete = async (itemId) => {
    try {
      const res = await fetch(`http://localhost:3001/api/menu/${itemId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        // Refresh the menu list
        setItems((prev) => prev.filter((item) => item._id !== itemId));
      } else {
        console.error("Delete failed");
      }
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

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
    <div id="Menu" className="menu-page">
      <div className="restaurant-list">
        {restaurants.map((restaurant) => (
          <button
            key={restaurant._id}
            className={`restaurant-button ${
              selectedRestaurant?._id === restaurant._id ? "active" : ""
            }`}
            onClick={() => setSelectedRestaurant(restaurant)}
          >
            {restaurant.name}
          </button>
        ))}
      </div>

      {selectedRestaurant && (
        <>
          {/* Show Add Item button only if logged in user is the restaurant */}
          {loggedInUserType === "restaurant" &&
            loggedInUserData?.id === selectedRestaurant._id && (
              <button
                className="toggle-add-button"
                onClick={() => setAddingItem(!addingItem)}
              >
                {addingItem ? "✖ Cancel" : "➕ Add Menu Item"}
              </button>
            )}

          {/* Add item form */}
          {addingItem && (
            <div className="add-item-wrapper">
              <div className="add-item-form">
                <input
                  type="text"
                  name="name"
                  placeholder="Item Name"
                  value={newItem.name}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="price"
                  placeholder="Price (e.g. $9.99)"
                  value={newItem.price}
                  onChange={handleChange}
                />
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(e) =>
                    setNewItem((prev) => ({
                      ...prev,
                      image: e.target.files[0],
                    }))
                  }
                />
                <button className="save-item-button" onClick={handleAddItem}>
                  <span className="plus-icon">+</span> Save Item
                </button>
              </div>
            </div>
          )}
          <div class="menu-page">
            <div className="menu-section">
              <div className="menu-items">
                {items.length === 0 && (
                  <p>No menu items available for this restaurant.</p>
                )}
                {items.map((item, index) => (
                  <div key={item._id || index} className="menu-card">
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
                    {/* Show Delete button only if the logged-in restaurant owns this item */}
                    {loggedInUserType === "restaurant" &&
                      loggedInUserData?.id === selectedRestaurant._id && (
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>
                      )}
                    {loggedInUserType === "user" && (
                      <button
                        className="add-to-cart"
                        onClick={() => handleAddtoCart(item._id)}
                      >
                        add to cart
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MenuPage;
