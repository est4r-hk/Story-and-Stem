import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import SearchBar from "./SearchBar";
import Mycarousel from './Carousel';

const Clothes = () => {

  // 🔍 Search
  const [searchTerm, setSearchTerm] = useState("");

  // Existing state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const img_url = "https://estherhyrax.alwaysdata.net/static/images/";
  const navigate = useNavigate();

  // =========================
  // 🛒 ADD TO CART
  // =========================
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find(item => item.product_id === product.product_id);

    if (exists) {
      cart = cart.map(item =>
        item.product_id === product.product_id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart ✅");
  };

  // =========================
  // ❤️ SAVE FOR LATER
  // =========================
  const saveForLater = (product) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = wishlist.find(item => item.product_id === product.product_id);

    if (!exists) {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      alert("Saved for later ❤️");
    } else {
      alert("Already saved ❤️");
    }
  };

  // =========================
  // FETCH PRODUCTS
  // =========================
  const getProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("https://estherhyrax.alwaysdata.net/api/get_product");
      setProducts(response.data);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // =========================
  // FILTER PRODUCTS
  // =========================
  const filteredProducts = products.filter(product =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='row'>

      {/* Carousel */}
      <Mycarousel /><br />

      {/* 🔍 Search Bar */}
      <SearchBar onSearch={setSearchTerm} className="text-search" />

      {/* Loading / Error */}
      {loading && <p>Loading products...</p>}
      {error && <p className="text-danger">{error}</p>}

      <h3 className='header2'>Clothes</h3>

      

      {/* Products */}
      {filteredProducts.length === 0 && !loading && (
        <p className="text-center">No products found 😢</p>
      )}

      {filteredProducts.map((product) => (
        <div
          className='col-md-3 justify-content-center mb-4'
          key={product.product_id}
        >
          <div className='card shadow card-margin'>

            <img
              className='mt-2 product_img'
              src={img_url + product.product_photo}
              alt={product.product_name}
            />

            <div className='card-body'>
              <h5>{product.product_name}</h5>
              <p className='text'>{product.product_description}</p>
              <b className='text-warning'>Ksh. {product.product_cost}</b>

              {/* Purchase */}
              <button
                className='btn btn-dark mt-2 w-100'
                onClick={() => navigate("/makepayment", { state: { product } })}>
                Purchase Now
              </button>

              {/* Add to Cart */}
              <button
                className="btn btn-outline-dark mt-2 w-100"
                onClick={() => addToCart(product)}>
                Add to Cart 🛒
              </button>

              {/* Save for Later */}
              <button
                className="btn btn-outline-dark mt-2 w-100"
                onClick={() => saveForLater(product)}>
                Save ❤️
              </button>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Clothes;