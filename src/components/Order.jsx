import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Orders() {
  const { user } = useContext(AuthContext);

  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const updatedOrder = updateOrderStatus(order);

  const userOrders = orders.filter(
    (order) => order.user === user?.email
  );

  const statuses = [
    { status: "Processing", location: "Warehouse" },
    { status: "Shipped", location: "Nairobi Hub" },
    { status: "Out for Delivery", location: "Near You" },
    { status: "Delivered", location: "Customer Address" }
  ];

  return (
    <div className="container mt-4">
      <h2>Your Orders</h2>

      {userOrders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        
        userOrders.map((order, index) => (
          <div key={index} className="card p-3 mb-3">
            <p>Total: KES {order.total}</p>
            <p>Date: {order.date}</p>

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

export default Orders;