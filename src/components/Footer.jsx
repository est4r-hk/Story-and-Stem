import React from 'react'
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'



const Footer = () => {
  return (
    <footer className="footer text-light pt-5 pb-3">
      <div className="container">
        <div className="row">

          
          

          {/* Brand */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">The Story And Stem</h5>
            <p className='text-dark'>
              We believe in timeless fashion that transcends trends.Our curated collection of pre-loved clothing offers a sustainable and stylish alternative for fashion enthusiasts. Join us in embracing the beauty of second-hand fashion and making a positive impact on the environment.
            </p>
          </div>


          <div class="col-md-4">

                    <h2 class=" text-center">Contact Us</h2>

                    <div>
                    <p class="text-dark"><b className=''>Telephone:</b> +254721364895/+25478901234</p>
                    <p class="text-dark"><b className=''>Email:</b> thestoryandstem@gmail.com</p>
                    </div>

                </div>

          {/* Social */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-semibold">Follow Us</h6>
            <div className="d-flex gap-3">
              <a href="http://www.facebook.com" className="footer-link text-dark">Facebook</a>
              <a href="http://www.x.com" className="footer-link text-dark">Twitter</a>
              <a href="http://www.instagram.com" className="footer-link text-dark">Instagram</a>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="text-center border-top pt-3 mt-3 small">
         &copy;{new Date().getFullYear()} TheStory&Stem. All rights reserved.
        </div>
        
        <div className="text-center mt-4">
            <Link to="/privacy" className="me-3">Privacy Policy</Link>
            <Link to="/terms">Terms & Conditions</Link>
        </div>

      </div>
    </footer>
  )
}

export default Footer