import { useState } from "react";

function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);

  const handleTrack = () => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const found = orders.find((o) => o.id.toString() === orderId);
    setOrder(found);
  };

  return (
    <div className="container mt-4 text-center">
      <h2>Track Your Order</h2>

      <input
        className="form-control w-50 mx-auto my-3"
        placeholder="Enter Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />

      <button className="btn btn-dark" onClick={handleTrack}>
        Track
      </button>

      {order && (
        <div className="card mt-4 p-3">
          <h5>Status: {order.status}</h5>
          <p>Location: {order.location}</p>
          <p>Total: KES {order.total}</p>
        </div>
      )}
    </div>
  );
}

export default TrackOrder;