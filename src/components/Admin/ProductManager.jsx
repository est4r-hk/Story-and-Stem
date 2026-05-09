import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { useState, useEffect } from "react";

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: ""
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(saved);
  }, []);

  const saveProducts = (data) => {
    setProducts(data);
    localStorage.setItem("products", JSON.stringify(data));
  };

  const handleAdd = () => {
    const newProduct = {
      id: Date.now(),
      ...form,
      price: Number(form.price)
    };

    saveProducts([...products, newProduct]);
    setForm({ name: "", category: "", price: "" });
  };

  const handleDelete = (id) => {
    saveProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div>
      <h4>Manage Products</h4>

      {/* Add Product */}
      <div className="d-flex gap-2 my-2">
        <input
          placeholder="Name"
          className="form-control"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
        <input
          placeholder="Category"
          className="form-control"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        />
        <input
          placeholder="Price"
          className="form-control"
          type="number"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        <button className="btn btn-dark" onClick={handleAdd}>
          Add
        </button>
      </div>

      {/* Product List */}
      {products.map((p) => (
        <div key={p.id} className="card p-2 mb-2 d-flex flex-row justify-content-between">
          <span>
            {p.name} - KES {p.price}
          </span>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(p.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductManager;