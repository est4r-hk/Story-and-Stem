import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import AddProduct from './components/AddProduct';
import GetProduct from './components/GetProduct';
import MpesaPayment from './components/MpesaPayment';

function App() {
  return (
    <Router>
      <div className="App ">
        <div className="App-header">
          <h1 className='text-danger'>Welcome to Soko Garden</h1>
        </div>
        {/* Linking routes */}
        <nav className='navs'>
          <br /><Link to="/signup" className='btn btn-outline-danger ms-3'>Sign up</Link>
          <Link to="/signin" className='btn btn-outline-danger ms-3'>Sign in</Link>
          <Link to="/addproduct" className='btn btn-outline-danger ms-3'>Add Product</Link>
          <Link to="/" className='btn btn-outline-danger ms-3'>Get Product</Link>
          
        </nav>

        <Routes>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/addproduct' element={<AddProduct/>}/>
          <Route path='/' element={<GetProduct/>}/>
          <Route path='/makepayment' element={<MpesaPayment/>}/>


        </Routes>

      </div>

    </Router>

  );
}

export default App;
