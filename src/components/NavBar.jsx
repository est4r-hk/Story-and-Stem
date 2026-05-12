import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { Link } from "react-router-dom";
import { ThemeContext } from "../components/Theme";

function Navbar() {

  const { darkMode, toggleTheme } =
    useContext(ThemeContext);

  const { user, logout } =
    useContext(AuthContext);

  const [cartCount, setCartCount] =
    useState(0);

  const navigate = useNavigate();

  // =========================
  // 🛒 LOAD CART COUNT
  // =========================
  useEffect(() => {

    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCartCount(cart.length);

  }, []);

  // =========================
  // 🚪 LOGOUT
  // =========================
  const handleLogout = () => {

    logout();

    localStorage.removeItem("user");

    navigate("/signin");

  };

  // =========================
  // 🔐 ACCESS CONTROL
  // =========================
  const canAddClothe =
    user &&
    (
      user.role === "admin" ||
      user.role === "subscriber"
    );

  return (

    <nav className="navs navbar navbar-expand-sm navbar-dark px-3">

      {/* LOGO */}
      <NavLink
        className="navbar-brand fw-bold textnav"
        to="/home"
      >
        Story & Stem 👗
      </NavLink>

      {/* MOBILE TOGGLE */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse"
        id="navbarNav"
      >

        <ul className="navbar-nav ms-auto align-items-center">

          {/* HOME */}
          <li className="nav-item">
            <NavLink
              to="/"
              className="nav-link">
              Clothes
            </NavLink>
          </li>

          {/* 🔐 ADMIN / SUBSCRIBER ONLY */}
          {canAddClothe && (
            <li className="nav-item">
              <NavLink
                to="/addclothe"
                className="nav-link">
                Add Clothe
              </NavLink>
            </li>
          )}

          {/* ❤️ WISHLIST */}
          <li className="nav-item">
            <Link
              to="/wishlist"
              className="btn btn-outline-dark ms-2">
              ❤️ Save
            </Link>
          </li>

          {/* 📦 TRACK */}
          <li className="nav-item">
            <Link
              to="/track"
              className="btn btn-outline-dark ms-2">
              Track Order
            </Link>
          </li>

          {/* 🛒 CART */}
          <li className="nav-item">
            <Link
              to="/cart"
              className="btn btn-outline-dark ms-2">
              Cart ({cartCount})
            </Link>
          </li>

          {/* 👤 USER */}
          {user ? (
            <>

              {/* USERNAME */}
              <li className="nav-item">
                <span className="nav-link text-light fw-bold">
                  👋 {user.username}
                </span>
              </li>

              
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-danger btn-sm ms-2">
                  Logout
                </button>
              </li>

            </>
          ) : (
            <>

              {/* SIGNUP */}
              <li className="nav-item">
                <NavLink
                  to="/signup"
                  className="nav-link"
                >
                  Signup
                </NavLink>
              </li>

              {/* SIGNIN */}
              <li className="nav-item">
                <NavLink
                  to="/signin"
                  className="nav-link"
                >
                  Signin
                </NavLink>
              </li>

            </>
          )}

          {/* 🌙 DARK MODE */}
          <li className="nav-item ms-2">

            <button
              onClick={toggleTheme}
              className="btn btn-outline-light"
            >
              {darkMode ? "🌙" : "☀️"}
            </button>

          </li>

        </ul>

      </div>

    </nav>
  );
}

export default Navbar;