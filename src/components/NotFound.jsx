import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-5">
      {/* Text */}
      <h1 className="display-4 text-danger fw-bold mt-3">404</h1>
      <h3 className="mb-2">Oops! Page not found</h3>
      <p className="text-muted">
        The page you’re looking for doesn’t exist or was moved.
      </p>

        {/* Button */}
      <button
        className="btn btn-danger mt-3"
        onClick={() => navigate("/")}
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;
