import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";

function Checkout() {

  const navigate = useNavigate();

  const {
    cart,
    cartTotal
  } = useContext(CartContext);

  // =========================
  // GO TO MPESA PAGE
  // =========================
  const proceedToPayment = () => {

    navigate("/makepayment", {
      state: {
        cart,
        total: cartTotal
      }
    });
  };

  return (

    <div className="container text-center mt-5">

      <h2 className="mb-4">
        Checkout
      </h2>

      {/* =========================
          CART ITEMS
      ========================= */}

      {cart.length === 0 ? (

        <p>Your cart is empty 🛒</p>

      ) : (

        cart.map((item, index) => {

          const price =
            Number(
              item.product_cost ||
              item.price ||
              0
            );

          const quantity =
            item.quantity || 1;

          const subtotal =
            price * quantity;

          return (

            <div
              key={index}
              className="card p-3 mb-3 shadow-sm"
            >

              <h5>
                {item.product_name || item.name}
              </h5>

              <p>
                Quantity: {quantity}
              </p>

              <p>
                Price:
                {" "}
                KES {price.toLocaleString()}
              </p>

              <p>
                Subtotal:
                {" "}
                KES {subtotal.toLocaleString()}
              </p>

            </div>
          );
        })
      )}

      {/* =========================
          TOTAL
      ========================= */}

      <h4 className="mt-4">
        Total:
        {" "}
        KES {cartTotal.toLocaleString()}
      </h4>

      {/* =========================
          PAYMENT BUTTON
      ========================= */}

      <button
        className="btn btn-success mt-3"
        onClick={proceedToPayment}
        disabled={cart.length === 0}
      >

        Proceed to M-Pesa

      </button>

    </div>
  );
}

export default Checkout;