import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signin = () => {

     // Declaring state variables
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")

  // Status messages
  const[loading,setLoading] = useState("")
  const[error,setError] = useState("")
  const[success,setSuccess] = useState("")

  // Navigation
  const navigate = useNavigate()

  // Function to submit
  const handleSignin =async(e)=>{
    e.preventDefault();
    setLoading("Please wait...")
    try{
      // Retreiving user details
      const formData = new FormData();
      formData.append("email",email)
      formData.append("password",password)

      // Adding url
      const response = await axios.post("https://estherhyrax.alwaysdata.net/api/signin",formData);
      if(response.data.user){
        setSuccess(response.data.message)
        setLoading("")
        localStorage.setItem("user",JSON.stringify(response.data.user))

        // Navigation on success sign in
        navigate("/")
      }
    }catch (error){
      setError(error)
    }

  }
  return (
    <div className='container'>
        <div className='row justify-content-center'>
            <div className='formin col-md-6 card shadow m-2 p-4'>
                <h1 className='header'>Sign In</h1>

                <h6 id='h6'>{loading}</h6><br />
                <h6 id='h6'>{error}</h6><br />
                <h6 id='h6'>{success}</h6>

                <form action="" onSubmit={handleSignin}>
                    <fieldset>
                        <input type="email" placeholder='Enter email' className='form-control' onChange={(e)=>setEmail(e.target.value)}/><br />
                        <input type="password" placeholder='Enter password' className='form-control' onChange={(e)=>setPassword(e.target.value)}/><br />
                        <input type="submit" value="Sign in" className='btn btn-dark form-control'/><br />
                        <br /><Link to = "/signin" className='btn btn-dark w-100'>Don't have an Account ? Sign up</Link>
                    </fieldset>

                </form>

            </div>

        </div>
        
    </div>
  )
}

export default Signin