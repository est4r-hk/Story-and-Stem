import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useState, useEffect } from "react";

function CookieBanner() {

  // =========================
  // 🍪 STATE (DEFAULT HIDDEN FALSE UNTIL CHECKED)
  // =========================
  const [visible, setVisible] = useState(false);

  // =========================
  // 📦 CHECK CONSENT ON LOAD
  // =========================
  useEffect(() => {

    const consent =
      localStorage.getItem("cookieConsent");

    // show banner ONLY if no decision exists
    if (consent === null) {
      setVisible(true);
    }

  }, []);

  // =========================
  // 👍 ACCEPT COOKIES
  // =========================
  const handleAccept = () => {

    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);

  };

  // =========================
  // 👎 DECLINE COOKIES
  // =========================
  const handleDecline = () => {

    localStorage.setItem("cookieConsent", "declined");
    setVisible(false);

  };

  // =========================
  // 🚫 DON'T RENDER IF NOT VISIBLE
  // =========================
  if (!visible) return null;

  return (

    <div className="cookie-banner position-fixed bottom-0 w-100 p-3 shadow bg-dark text-white">

      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">

        <p className="mb-2 mb-md-0">

          We use cookies to improve your experience. By using our site, you agree to our{" "}

          <a href="/privacy" className="text-warning">
            Privacy Policy
          </a>

        </p>

        <div>

          <button
            className="btn btn-success me-2"
            onClick={handleAccept}
          >
            Accept
          </button>

          <button
            className="btn btn-outline-light"
            onClick={handleDecline}
          >
            Decline
          </button>

        </div>

      </div>

    </div>

  );
}

export default CookieBanner;