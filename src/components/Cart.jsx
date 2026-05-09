import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // ✅ Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // ✅ Remove item
  const removeFromCart = (product_id) => {
    const updatedCart = cart.filter(item => item.product_id !== product_id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ✅ Calculate total
  const total = cart.reduce((sum, item) => {
    return sum + (item.product_cost * (item.quantity || 1));
  }, 0);

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.product_id} className="card p-3 mb-2">
              <h5>{item.product_name}</h5>
              <p>
                KES {item.product_cost} x {item.quantity || 1}
              </p>

              <button
                className="btn btn-dark text-light"
                onClick={() => removeFromCart(item.product_id)}
              >
                Remove
              </button>
            </div>
          ))}

          <h4>Total: KES {total}</h4>

          <button
            className="btn btn-light text-dark"
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