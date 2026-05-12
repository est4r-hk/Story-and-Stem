import axios from 'axios';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

const MpesaPayment = () => {

  // =========================
  // SAFE DATA FROM CHECKOUT
  // =========================
  const location = useLocation();
  const { cart = [], total = 0 } = location.state || {};

  const safeTotal = Number(total) || 0;

  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const img_url = "https://estherhyrax.alwaysdata.net/static/images/"

  // =========================
  // HANDLE PAYMENT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault()

    setMessage("Please wait as we process the transaction 📲")
    setError("")

    try {

      const formData = new FormData();
      formData.append("phone", phone)
      formData.append("amount", safeTotal)

      const response = await axios.post(
        "https://estherhyrax.alwaysdata.net/api/mpesa_payment",
        formData
      )

      console.log(response.data)

      if (response.data.success) {
        setMessage("STK Push sent! Check your phone 📱")
      } else {
        setError(response.data.message || "Payment failed")
      }

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Something went wrong. Try again."
      )
    }
  }

  // =========================
  // PHONE VALIDATION (BASIC)
  // =========================
  const isPhoneValid = phone.startsWith("254") && phone.length >= 12;

  return (

    <div className='row justify-content-center'>

      <div className='formpesa col-md-6 card shadow card-margin m-2 p-3'>

        <h1 className='header2'>LIPA NA MPESA</h1>

        <div>

          {/* =========================
              CART DISPLAY SAFE
          ========================= */}
          {cart.length === 0 ? (

            <p className="text-danger">
              {/* No items found in checkout 🛒 */}
            </p>

          ) : (

            cart.map((item, index) => (

              <div key={index} className="mb-3">

                <img
                  className='product_img'
                  src={img_url + (item.product_photo || "")}
                  alt={item.product_name || "product"}
                />

                <p className='text'>
                  Product Name: {item.product_name || item.name}
                </p>

                <p className='text-warning'>
                  Quantity: {item.quantity || 1}
                </p>

                <p className='text-warning'>
                  Price: {Number(item.product_cost || item.price || 0)}
                </p>

              </div>

            ))

          )}

          {/* =========================
              TOTAL SAFE
          ========================= */}
          <p className='text-warning'>
            Total Cost: <b>KES {safeTotal.toLocaleString()}</b>
          </p>

          {/* =========================
              STATUS
          ========================= */}
          <h6 className='text-success'>{phone}</h6>
          <h6 className='text-success'>{message}</h6>
          <h6 className='text-danger'>{error}</h6>

          {/* =========================
              FORM
          ========================= */}
          <form onSubmit={handleSubmit}>

            <label className='text-danger'>
              Phone Number
            </label>

            <input
              type="text"
              placeholder='2547XXXXXXXX'
              className='form-control'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <br />

            <button
              className='btn btn-danger w-100'
              disabled={!isPhoneValid || safeTotal < 0}
            >
              Make Payment
            </button>

          </form>

        </div>

      </div>

    </div>
  )
}

export default MpesaPayment;