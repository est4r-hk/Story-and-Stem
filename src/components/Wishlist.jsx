import React, { useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { CartContext } from "../components/CartContext"; 

function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart } = useContext(CartContext);

  return (
    <div className="container mt-4">
      <h2>Saved for Later ❤️</h2>

      {wishlist.length === 0 ? (
        <p>No saved items yet</p>
      ) : (
        wishlist.map((item) => (
          <div key={item.id} className="card p-3 mb-3">
            <h5>{item.name}</h5>
            <p>KES {item.price}</p>

            <button
              className="btn btn-success me-2"
              onClick={() => addToCart(item)}
            >
              Move to Cart
            </button>

            <button
              className="btn btn-danger"
              onClick={() => removeFromWishlist(item.id)}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Wishlist;