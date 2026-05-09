import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { useContext } from "react";
import { AuthContext } from "../../components/AuthContext";
import ProductManager from "./ProductManager";
import OrderManager from "./OrderManager";

function AdminDashboard() {
  const { user } = useContext(AuthContext);

  const isAdmin = user?.email === "admin@storyandstem.com";

  if (!isAdmin) {
    return <h3 className="text-center mt-5">Access Denied</h3>;
  }

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>

      <ProductManager />
      <hr />
      <OrderManager />
    </div>
  );
}

export default AdminDashboard;