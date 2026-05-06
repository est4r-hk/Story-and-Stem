import { useState, useEffect } from "react";

function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner position-fixed bottom-0 w-100 p-3 shadow">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        
        <p className="mb-2 mb-md-0">
          We use cookies to improve your experience. By using our site, you agree to our{" "}
          <a href="/privacy">Privacy Policy</a>.
        </p>

        <div>
          <button
            className="btn btn-success me-2"
            onClick={handleAccept}
          >
            Accept
          </button>

          <button
            className="btn btn-outline-secondary"
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