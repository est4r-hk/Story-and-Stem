import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Mycarousel from './Mycarousel';
import SearchBar from "./SearchBar";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";



const clothes =
  JSON.parse(localStorage.getItem("products")) || [];

const Clothes = () => {

     // Declaring state variables
  const[products,setProducts] = useState([]);
  const[loading,setLoading] = useState("");
  const[error,setError] = useState("");

  // Image url
  const img_url = "https://estherhyrax.alwaysdata.net/static/images/"

  // Navigation
  const navigate = useNavigate()

  // function to call products
  const getProducts = async()=>{
    setLoading("Please wait as we retrieve product")
    try{
      const response = await axios.get("https://estherhyrax.alwaysdata.net/api/get_product")
      setProducts(response.data)
      setLoading("")
    }catch (error){
      setError(error.message)
    }
  }



  // UseEffect to retrieve product automatically
  useEffect(()=>{
    getProducts()
  },[]);
  const { addToCart, saveForLater } = useContext(CartContext);

  return (
    <div className='row'>
      <SearchBar onSearch={setSearchTerm} />

        {loading}<br/>
        {error}

        <h3 className='header'>Available Clothes</h3>

        <Mycarousel/>

        {/* Designing the products card */}
        {products.map((product)=>(

            <div className='col-md-3 justify-content-center mb-4'>

                key = {product.product_id}

                <div className='card shadow card-margin'>

                    <img className='mt-2 product_img' src = {img_url + product.product_photo} alt = {product.product_photo} />

                    <div className='card-body'>
                        <h5 className='mt-2'>{product.product_name}</h5>
                        <p className='text-muted'>{product.product_description}</p>
                        <b className='text-warning'>Ksh.{product.product_cost}</b>

                        <button className='btn btn-dark mt-2 w-100' onClick={()=> navigate("/makepayment",{state:{product}})}>Purchase Now</button>

                        <button
                          className="btn btn-outline-dark mt-2"
                          onClick={() => addToCart(item)}
                        >
                          Add to Cart
                        </button>


                        <button
                          className="btn btn-dark w-100 mb-2"
                          onClick={() => addToCart(item)}
                        >
                          Add to Cart
                        </button>

                        <button
                          className="btn btn-outline-secondary w-100"
                          onClick={() => saveForLater(item)}
                        >
                          Save for Later ❤️
                        </button>

                       
                      </div>
                  </div>
              </div>
          ))};
      </div>

    
  )
}
export default Clothes;

