import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Mycarousel from './Carousel';

function Home() {

  return (

    <div className="container mt-5 mb-5">

        {/* Carousel */}
        <Mycarousel /><br />

      {/* HERO SECTION */}
      <div className="text-center mb-5">

        <h1 className="fw-bold">
          Story & Stem
        </h1>

        <p className="lead text">
          Wear Your Story — Where creativity meets timeless fashion.
        </p>

      </div>

      {/* MAIN SECTION */}
      <div className="row align-items-center">

        {/* IMAGE */}
        <div className="col-md-6 mb-4">

          <img
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b"
            alt="Fashion"
            className="img-fluid rounded shadow"
          />

        </div>

        {/* TEXT */}
        <div className="col-md-6">

          <h3 className="fw-bold mb-3">
            Our Story
          </h3>

          <p className="text">
            Story & Stem is more than a fashion store —
            it is a creative space where style meets identity,
            confidence, and self-expression.
          </p>

          <p className="text">
            We combine modern e-commerce technology with
            curated fashion pieces to give you a smooth,
            stylish, and enjoyable shopping experience.
          </p>

          <p className="text">
            Every outfit tells a story — and we help you
            wear yours with pride.
          </p>

        </div>

      </div>

      {/* MISSION & VISION */}
      <div className="row mt-5">

        {/* MISSION */}
        <div className="col-md-6 mb-4">

          <div className="card shadow border-0 h-100">

            <div className="card-body">

              <h4 className="fw-bold">
                🌟 Mission
              </h4>

              <p className="text">
                To provide stylish, affordable fashion
                while delivering a seamless digital shopping
                experience powered by innovation.
              </p>

            </div>

          </div>

        </div>

        {/* VISION */}
        <div className="col-md-6 mb-4">

          <div className="card shadow border-0 h-100">

            <div className="card-body">

              <h4 className="fw-bold">
                🚀 Vision
              </h4>

              <p className="text">
                To become a leading online fashion brand
                that inspires confidence, creativity, and
                individuality in every customer.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* WHY US */}
      <div className="mt-5">

        <h3 className="fw-bold text-center mb-4">
          Why Choose Story & Stem?
        </h3>

        <div className="row text-center">

          {/* CARD 1 */}
          <div className="col-md-4 mb-4">

            <div className="card border-0 shadow h-100">

              <div className="card-body">

                <h1>🛍️</h1>

                <h5 className="fw-bold">
                  Trendy Styles
                </h5>

                <p className="text">
                  Carefully selected fashion pieces
                  for modern and classic looks.
                </p>

              </div>

            </div>

          </div>

          {/* CARD 2 */}
          <div className="col-md-4 mb-4">

            <div className="card border-0 shadow h-100">

              <div className="card-body">

                <h1>⚡</h1>

                <h5 className="fw-bold">
                  Easy Shopping
                </h5>

                <p className="text">
                  Smooth experience with cart, wishlist,
                  checkout, and M-Pesa payments.
                </p>

              </div>

            </div>

          </div>

          {/* CARD 3 */}
          <div className="col-md-4 mb-4">

            <div className="card border-0 shadow h-100">

              <div className="card-body">

                <h1>💖</h1>

                <h5 className="fw-bold">
                  Customer First
                </h5>

                <p className="text">
                  We prioritize customer satisfaction
                  and quality service always.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Home;