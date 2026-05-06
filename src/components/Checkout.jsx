import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

function Checkout() {
  const { cart, total, clearCart } = useContext(CartContext);
  const [phone, setPhone] = useState("");

  const handlePayment = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/mpesa/stkpush", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          amount: total,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("STK Push sent! Check your phone 📱");
        clearCart();
      } else {
        alert("Payment failed");
      }
    } catch (error) {
      console.error(error);
      alert("Error processing payment");
    }
  };

  return (
    <div className="container text-center mt-5">
      <h2>Checkout</h2>

      {cart.map((item, index) => (
        <p key={index}>
          {item.name} x {item.qty}
        </p>
      ))}

      <h4>Total: KES {total}</h4>

      <input
        type="text"
        placeholder="2547XXXXXXXX"
        className="form-control w-50 mx-auto my-3"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button className="btn btn-success" onClick={handlePayment}>
        Pay with M-Pesa
      </button>
    </div>
  );

  
};

export default Checkout;