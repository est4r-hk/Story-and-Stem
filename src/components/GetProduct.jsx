import React, { useEffect, useState } from 'react'
import image from '../logo.svg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const GetProduct = () => {


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
  return (

    <div className='row'>
      {loading}<br/>
      {error}

      <h3 className='header'>Available Products</h3>

      {/* Designing the products card */}
      {products.map((product)=>(

        <div className='col-md-3 justify-content-center mb-4'>

          key = {product.product_id}

          <div className='card shadow card-margin'>

            <img className='mt-2 product_img' src = {img_url + product.product_photo} alt = {product.product_photo}/>

            {/* The product details */}
            <div className='card-body'>

              <h5 className='mt-2'>{product.product_name}</h5>
              <p className='text-muted'>{product.product_description}</p>
              <b className='text-warning'>Ksh.{product.product_cost}</b><br />

              <button className='btn btn-dark mt-2 w-100' onClick={()=> navigate("/makepayment",{state:{product}})}>Purchase Now</button>
            </div>

          </div>

        </div>
      ))};
    </div>

  )

}

export default GetProduct