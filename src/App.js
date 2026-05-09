import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { useContext } from 'react';

import Clothes from './components/Clothes';
import Signup from './components/Signup';
import Signin from './components/Signin';
import AddClothe from './components/AddClothe';
import MpesaPayment from './components/MpesaPayment';
import Footer from './components/Footer';

import UserDetails from './components/UserDetails';
import NotFound from './components/NotFound';
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Navbar from './components/NavBar';
import AdminDashboard from './components/Admin/AdminDashboard';

import PrivacyPolicy from "./components/PrivacyPolicy";
import Terms from "./components/Terms";
import Wishlist from "./components/Wishlist";
import TrackOrder from "./components/TrackOrder";
import CookieBanner from "./components/CookieBanner"; 
import Home from "./components/Home";

import { CartProvider } from './components/CartContext';
import {ThemeProvider } from "./components/Theme";
import { AuthProvider, AuthContext } from "./components/AuthContext";



function AppContent() {

  // const navigate = useNavigate();

   // 👤 USER CONTEXT
  
  const { user } =
    useContext(AuthContext);

  
  // 🔐 ACCESS CONTROL
  
  const canAddClothe =
    user &&
    (
      user.role === "admin" ||
      user.role === "subscriber"
    );

  
  return (

    

          <Router>
            

            <div className='App'>

              <div className='App-header'>

                <h1 
                className='header1 text-left '>
                  Story & Stem — Wear Your Story</h1>
              
              </div>
              
              <Navbar/>
              <UserDetails/>
              
                {/* Linking routes
                <nav className='text-left'>
                  

                  <Link to="/" className=' App-link btn btn-outline dark ms-3'>Clothes</Link>
                  <Link to="/Signup" className='btn btn-outline-dark ms-3'>Sign Up</Link>
                  <Link to="/Signin" className='btn btn-outline-dark ms-3'>Sign In</Link>
                  <Link to="/AddClothe" className='btn btn-outline-dark ms-3'>Add Clothe</Link>
                  
                </nav> */}

                

              <Routes>

                <Route 
                path='/' 
                element={<Clothes/>}/>

                <Route 
                path='/signup' 
                element={<Signup/>}/>

                <Route 
                path='/signin' 
                element={<Signin/>}/>

                <Route
                path="/addclothe"
                element={
                canAddClothe?
                <AddClothe />:
                <Navigate to="/signin" />}/>

                <Route 
                path='/makepayment' 
                element={<MpesaPayment/>}/>

                {/* 404 Route */}
                <Route 
                path="*" 
                element={<NotFound/>} />

                <Route 
                path="/checkout" 
                element={<Checkout />} /> 

                <Route 
                path="/wishlist" 
                element={<Wishlist />} /> 

                <Route 
                path="/privacy" 
                element={<PrivacyPolicy />} />
                
                <Route 
                path="/terms" 
                element={<Terms />} />   

                <Route 
                path="/track" 
                element={<TrackOrder />} />  

                <Route 
                path="/admin" 
                element={<AdminDashboard />} />

                <Route 
                path="/cart" 
                element={<Cart />} />

                <Route 
                path="/home" 
                element={<Home />} />

              </Routes>

              {/* <Carousel/> */}

            <Footer/>
            <CookieBanner />

            </div>

          </Router>
           
  );

}

// ✅ ROOT APP
// =========================
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          
            <AppContent />
          
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}


export default App;
