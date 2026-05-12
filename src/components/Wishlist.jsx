import React, { useContext, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { CartContext } from "../components/CartContext"; 

function Wishlist() {

  const {
    wishlist,
    removeFromWishlist,
    addToCart,
    setWishlist
  } = useContext(CartContext);

  // =========================
  // 🧠 LOAD WISHLIST FROM LOCALSTORAGE (FIX)
  // =========================
  useEffect(() => {

    const saved =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setWishlist(saved);

  }, [setWishlist]);

  return (

    <div className="container mt-4">

      <h2>
        Saved for Later ❤️
      </h2>

      {wishlist.length === 0 ? (

        <p>No saved items yet</p>

      ) : (

        wishlist.map((item) => (

          <div
            key={item.product_id || item.id}
            className="card p-3 mb-3"
          >

            <h5>
              {item.product_name || item.name || "Unnamed item"}
            </h5>

            <p>
              KES {item.product_cost || item.price || 0}
            </p>

            <button
              className="btn btn-dark me-2"
              onClick={() => addToCart(item)}
            >
              Move to Cart
            </button>

            <button
              className="btn btn-light text-dark"
              onClick={() =>
                removeFromWishlist(
                  item.product_id || item.id
                )
              }
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