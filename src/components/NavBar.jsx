import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";


const { darkMode, toggleTheme } = useContext(ThemeContext);

<button
  className="btn btn-outline-secondary ms-2"
  onClick={toggleTheme}
>
  {darkMode ? "☀️ Light" : "🌙 Dark"}
</button>


function Navbar() {
  const [username, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/signin");
  };

  const { cart } = useContext(CartContext);

    <Link to="/cart" className="btn btn-dark">
      Cart ({cart.length})
    </Link>


const { user, logout } = useContext(AuthContext);

  {user ? (
    <div className="d-flex align-items-center gap-2">
      <span>Hi, {user.name}</span>

      <button className="btn btn-outline-danger btn-sm" onClick={logout}>
        Logout
      </button>
    </div>
  ) : (
    <Link to="/signin" className="btn btn-outline-dark">
      Login
    </Link>
    
  )}

  return (
    <nav className=" navs navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <NavLink className="navbar-brand fw-bold" to="/signup">
        The Timeless Trunk
      </NavLink>

      <Link to="/wishlist" className="btn btn-outline-dark ms-2">
        ❤️ Saved
      </Link>
      <Link to="/track" className="btn btn-outline-dark ms-2">
        Track Order
      </Link>
      {/* Mobile toggle */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">

          {/* Always visible */}
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              Clothes
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/addclothe" className="nav-link">
              Add Clothe
            </NavLink>
          </li>

          {/* Conditional Rendering */}
          {user ? (
            <>
              {/* Username */}
              <li className="nav-item">
                <span className="nav-link text-success fw-bold">
                  👋 {user.username}
                </span>
              </li>

              {/* Logout */}
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-danger ms-2"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <NavLink to="/signup" className="nav-link">
                  Signup
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/signin" className="nav-link">
                  Signin
                </NavLink>
              </li>
            </>
          )}

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;