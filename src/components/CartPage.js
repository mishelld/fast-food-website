import React, { useEffect, useState } from "react";
import "./CartPage.css";

function CartPage() {
  const [cartItems, setCartItems] = useState([]); // array of { itemDetails, quantity }
  const [loading, setLoading] = useState(true);
  const [loggedInUserData, setLoggedInUserData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("account");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setLoggedInUserData(parsed.data);
      } catch (err) {
        console.error("Failed to parse user from localStorage", err);
      }
    }
  }, []);

  useEffect(() => {
    if (!loggedInUserData?.id) return;

    async function fetchCartItems() {
      try {
        const res = await fetch(
          `http://localhost:3001/api/cart/${loggedInUserData.id}`
        );
        if (!res.ok) throw new Error("Failed to fetch cart items");

        const cart = await res.json(); // already populated

        const cartWithDetails = cart.map((cartItem) => ({
          ...cartItem,
          itemDetails: cartItem.itemId,
        }));

        setCartItems(cartWithDetails);
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false); // ✅ Set loading to false here
      }
    }

    fetchCartItems();
  }, [loggedInUserData]);

  if (loading) return <p>Loading cart...</p>;

  if (cartItems.length === 0) return <p>Your cart is empty.</p>;

  // ✅ Optional: Calculate total
  const totalPrice = cartItems.reduce((total, { itemDetails, quantity }) => {
    if (!itemDetails?.price) return total;
    const price = parseFloat(itemDetails.price.replace("$", ""));
    return total + price * quantity;
  }, 0);

  const handleDelete = async (itemId) => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/cart/${loggedInUserData.id}/${itemId}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        // Refresh the cart list
        setCartItems((prev) =>
          prev.filter((cartItem) => cartItem.itemId._id !== itemId)
        );
      } else {
        console.error("Delete failed");
      }
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  return (
    <div className="cart-page-background">
      <div className="cart-container">
        <h2>Your Cart</h2>
        <ul className="cart-list">
          {cartItems.map(({ itemDetails, quantity }) => (
            <li key={itemDetails._id} className="cart-card">
              {" "}
              <div>
                <strong>{itemDetails.name}</strong>
                {/* Image */}
                {itemDetails.imageUrl && (
                  <>
                    {console.log(
                      "Image URL:",
                      `http://localhost:3001${itemDetails.imageUrl}`
                    )}
                    <img
                      src={`http://localhost:3001${itemDetails.imageUrl}`} // prepend your server base URL
                      alt={itemDetails.name}
                      className="menu-item-image"
                    />
                  </>
                )}
                <div>Price: {itemDetails.price}</div>
                <div>Quantity: {quantity}</div>
              </div>
              <div>
                Subtotal: $
                {(
                  parseFloat(itemDetails.price.replace("$", "")) * quantity
                ).toFixed(2)}
              </div>
              <button
                className="delete-button"
                onClick={() => handleDelete(itemDetails._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <h3 className="total-price">Total: ${totalPrice.toFixed(2)}</h3>
      </div>
    </div>
  );
}

export default CartPage;
