import { useEffect, useState } from "react";

function OrderManager() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(saved);
  }, []);

  return (
    <div>
      <h4>Orders</h4>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="card p-3 mb-3">
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>User:</strong> {order.user}</p>
            <p><strong>Total:</strong> KES {order.total}</p>
            <p><strong>Status:</strong> {order.status}</p>

            {order.items.map((item, i) => (
              <p key={i}>
                {item.name} x {item.qty}
              </p>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default OrderManager;