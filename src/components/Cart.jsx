import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { useNavigate } from "react-router-dom";

function Cart() {

  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // =========================
  // 🧠 LOAD CART
  // =========================
  useEffect(() => {
    const storedCart =
      JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // =========================
  // ❌ REMOVE ITEM
  // =========================
  const removeFromCart = (product_id) => {

    const updatedCart =
      cart.filter(item => item.product_id !== product_id);

    setCart(updatedCart);
    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // =========================
  // 💰 TOTAL PRICE (SAFE FIX)
  // =========================
  const cartTotal = cart.reduce((sum, item) => {
    return sum +
      (
        (item.product_cost || item.price || 0) *
        (item.quantity || 1)
      );
  }, 0);

  // =========================
  // 🧮 ITEM COUNTS
  // =========================
  const totalItems = cart.reduce(
    (sum, item) =>
      sum + (item.quantity || 1),
    0
  );

  const uniqueItems = cart.length;

  return (

    <div className="container mt-4">

      {/* =========================
          HEADER
      ========================= */}
      <h2>
        Your Cart
      </h2>

      {/* =========================
          CART SUMMARY
      ========================= */}
      {cart.length > 0 && (

        <div className="alert alert-primary mt-3">

          🛒 Products: <b>{uniqueItems}</b>
          {" | "}
          📦 Items: <b>{totalItems}</b>
          {" | "}
          💰 Total: <b>KES {cartTotal.toLocaleString()}</b>

        </div>

      )}

      {/* =========================
          EMPTY STATE
      ========================= */}
      {cart.length === 0 ? (

        <p>No items in cart 🛒</p>

      ) : (

        <>

          {/* =========================
              CART ITEMS
          ========================= */}
          {cart.map((item) => (

            <div
              key={item.product_id}
              className="card p-3 mb-2"
            >

              <h5>
                {item.product_name}
              </h5>

              <p>
                KES {(item.product_cost || item.price || 0)}
                {" x "}
                {item.quantity || 1}
              </p>

              <button
                className="btn btn-dark text-light"
                onClick={() =>
                  removeFromCart(item.product_id)
                }
              >
                Remove
              </button>

            </div>

          ))}

          {/* =========================
              TOTAL
          ========================= */}
          <h4 className="mt-3">
            Total: KES {cartTotal.toLocaleString()}
          </h4>

          {/* =========================
              CHECKOUT BUTTON
          ========================= */}
          <button
            className="btn btn-success mt-2"
            onClick={() =>
              navigate("/makepayment")
            }
            disabled={cart.length === 0}
          >

            Proceed to Payment

            {/* 🟢 BADGE */}
            <span className="badge bg-dark ms-2">
              {totalItems}
            </span>

          </button>

        </>

      )}

    </div>
  );
}

export default Cart;