import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {

     // Declaring state variables
  const[username,setUsername] = useState("")
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const[phone,setPhone] = useState("")

  // Set up messages
  const[loading,setLoading] = useState("")
  const[error,setError] = useState("")
  const[success,setSuccess] = useState("")

  // Function to submit
  const handleSubmit = async(e)=>{
    e.preventDefault();
    setLoading("Please wait...");
    try{
      // Retreaving user details
      const formData = new FormData();
      formData.append("username",username)
      formData.append("email",email)
      formData.append("password",password)
      formData.append("phone",phone)

      // Adding base url
      const response = await axios.post("https://estherhyrax.alwaysdata.net/api/signup",formData);
      setSuccess(response.data.success)
    }catch(error){
      setError(error)
    }

  }
  return (
    <div className='container'>
        <div className='row justify-content-center'>
            <div className='formup col-md-6 card shadow m-2 p-4'>
                <h1 className='header'>Sign Up</h1>

                <h6 id='h6'>{loading}</h6><br />
                <h6 id='h6'>{error}</h6> 
                <h6 id='h6'>{success}</h6>

                <form action=""onSubmit={handleSubmit}>

                    <fieldset>

                        <input type="text" placeholder='Enter username' className='form-control' onChange={(e)=>setUsername(e.target.value)}/><br />
                        <input type="email" placeholder='Enter email' className='form-control' onChange={(e)=>setEmail(e.target.value)}/><br />
                        <input type="password" placeholder='Enter password' className='form-control' onChange={(e)=>setPassword(e.target.value)}/><br />
                        <input type="tel" placeholder='Enter phone number' className='form-control' onChange={(e)=>setPhone(e.target.value)}/><br />
                        <input type="submit" value="Sign In" className='btn btn-dark form-control'/><br />
                    </fieldset><br />

                    {/* Incase user already has an account */}
                    <Link to = '/signin' className='btn btn-dark form-control'>Already have account, Sign in</Link><br />


                </form>

            </div>

        </div>

    </div>

  )
}

export default Signup