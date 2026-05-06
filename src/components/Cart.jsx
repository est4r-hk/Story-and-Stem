import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, total } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={index} className="card p-3 mb-2">
              <h5>{item.name}</h5>
              <p>KES {item.price} x {item.qty}</p>

              <button
                className="btn btn-danger"
                onClick={() => removeFromCart(item.name)}
              >
                Remove
              </button>
            </div>
          ))}

          <h4>Total: KES {total}</h4>

          <button
            className="btn btn-success"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;