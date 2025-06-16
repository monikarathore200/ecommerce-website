import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { CommonContext } from "../../ContextApi/Context";
import { FaHeart } from "react-icons/fa";

export default function Header() {
  const [categories, setCategories] = useState([]);
  const { cartItems, setIsLogin, isLogin } = useContext(CommonContext);

  const logout = () => {
    localStorage.removeItem("user_uid");
    setIsLogin("");
  };

  useEffect(() => {
    axios
      .get("https://wscubetech.co/ecommerce-api/categories.php")
      .then((result) => setCategories(result.data.data))
      .catch(() => toast.error("Something went wrong"));
  }, []);

  return (
    <>
      <ToastContainer />
      {/* MAIN HEADER */}
      <header className="sticky-top bg-white border-bottom shadow-sm">
        <div className="container py-3">
          <div className="row align-items-center">
            {/* Logo */}
            <div className="col-md-3 col-6 mb-2 mb-md-0">
              <Link to="/" className="text-decoration-none">
                <h1 className="fs-4 fw-bold m-0">ShopHub</h1>
              </Link>
            </div>

            {/* Search */}
            <div className="col-md-5 col-12 order-md-1 order-3 mt-2 mt-md-0">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="fa fa-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search products..."
                />
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="col-md-4 col-6 text-end order-md-2 order-2">
              <div className="d-flex justify-content-end align-items-center">
                <Link
                  to="/product"
                  className="btn btn-link text-dark d-none d-md-inline-block"
                >
                  Categories
                </Link>
                <a
                  href="#"
                  className="btn btn-link text-dark d-none d-md-inline-block"
                >
                  Deals
                </a>


                <Link to={'/wishlist'} >
                <div className="btn btn-link text-dark d-none d-md-inline-block"><FaHeart /></div>
                </Link>

                {isLogin ? (
                  <div
                    onClick={logout}
                    className="btn btn-link text-dark position-relative"
                    style={{ cursor: "pointer" }}
                  >
                    Logout
                  </div>
                ) : (
                  <Link
                    to="/Login-Register"
                    className="btn btn-link text-dark position-relative"
                  >
                    <i className="fa fa-user"></i>
                  </Link>
                )}

                <Link
                  to="/view-carts"
                  className="btn btn-link text-dark position-relative"
                >
                  <i className="fa fa-shopping-cart"></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartItems.length}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* CATEGORY LINKS BAR */}
        <div className="bg-light border-top">
          <div className="container py-2">
            <div className="d-flex justify-content-center flex-wrap">
              {categories.slice(0, 9).map((v, i) => (
                <Link
                  to={`product/${v.slug}`}
                  key={i}
                  className="btn btn-link text-dark d-none d-md-inline-block"
                >
                  {v.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
  