import axios from 'axios';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

const MpesaPayment = () => {

      // 
const {product} = useLocation().state ||{};
const[phone,setPhone] = useState("")
const[message,setMessage] = useState("")
const[error,setError] = useState("")


const img_url = "https://estherhyrax.alwaysdata.net/static/images/"

const handleSubmit = async(e)=>{
  e.preventDefault()

  setMessage("Please wait as we process the transaction")
  try{
    const formData = new FormData();
    formData.append("phone",phone)
    formData.append("amount",product.product_cost)


    const response = await axios.post("https://estherhyrax.alwaysdata.net/api/mpesa_payment",formData)
    console.log(response.data)
  }catch (error){
    setError( error.message)
  }
}
  return (

    <div className='row justify-content-center'>

      <div className='formpesa col-md-6 card shadow card-margin m-2 p-3'>

        <h1 className='header2'>LIPA NA MPESA</h1>

        <div className=''>

          <img className='product_img' src={img_url + product.product_photo} alt={product.product_photo}/>
          <p className='text-danger'>Product Name:{product.product_name}</p>
          <p className='text-warning'>Product Cost:{product.product_cost}</p>

          {/*  */}
          <h6 className='text-danger'>{phone}</h6>
          <h6 className='text-danger'>{message}</h6>
          <h6 className='text-danger'>{error}</h6>


          {/* Phone input */}
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="" className='text-danger'>Phone Number</label>
            <input 
              type="text" 
              placeholder='Enter phone number'
              className='form-control'
              onChange={(e)=>setPhone(e.target.value)}/>

              <br /><button 
                className='btn btn-danger w-100'>Make Payment</button>
          </form>
        </div>  
      </div>
    </div>
  )
}

export default MpesaPayment