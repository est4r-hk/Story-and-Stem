import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const AddClothe = () => {

    // 
  const[product_name,setProductName] = useState("")
  const[product_description,setProductDescription] = useState("")
  const[product_cost,settProductCost] = useState("")
  const[product_photo,setProductPhoto] = useState("")


  const[loading,setLoading] = useState("")
  const[error,setError] = useState("")
  const[success,setSuccess] = useState("")


  // 
  const handleSubmit = async(e)=>{
    e.preventDefault();
    setLoading('Please Wait....')

    // 
    try{
      const formData = new FormData();
      formData.append("product_name",product_name)
      formData.append("product_description",product_description)
      formData.append("product_cost",product_cost)
      formData.append("product_photo",product_photo)

      console.log("Testing")
      const response = await axios.post("https://estherhyrax.alwaysdata.net/api/add_product",formData);
      setLoading("")
      setSuccess(response.data.success)

    }catch (error){
      setError(error.message)
    }
  }
  return (
    <div className='container'>
        <div className='row justify-content-center'>
            <div className='formadd col-md-6 card shadow m-2 p-4'>
                <h1 className='header'>Add Clothes</h1>

                <h6 id='h6'>{loading}<br/></h6>
                <h6 id='h6'>{error}<br/></h6>
                <h6 id='h6'>{success}</h6>

                <nav>
                    <Link to="/" className='btn btn-dark'>Get All Clothes</Link><br /><br />
                 </nav>

                <form onSubmit={handleSubmit}>

                    <fieldset>

                        <input 
                            type="text" 
                            placeholder='Enter clothe name'
                            className='formcontrol w-100'
                            onChange={(e)=>setProductName(e.target.value)} 
                            required/><br/>

                        <br /><textarea 
                            placeholder='Clothe Description'
                            className='formcontrol w-100'
                            onChange={(e)=>setProductDescription(e.target.value)} 
                            required></textarea><br />

                        <br /><input 
                            type="number" 
                            placeholder='Enter clothe cost'
                            className='formcontrol w-100'
                            onChange={(e)=>settProductCost(e.target.value)} 
                            required/><br />

                        <br /><input 
                            type="file" 
                            placeholder='Choose clothe photo'
                            className='formcontrol w-100'
                            onChange={(e)=>setProductPhoto(e.target.files[0])} 
                            required/><br />

                        <input 
                            type="submit" 
                            value="Add Products" 
                            className='btn btn-dark  form-control  w-100'/>

                    </fieldset>

                </form>

            </div>

        </div>

    </div>

  )
}

export default AddClothe