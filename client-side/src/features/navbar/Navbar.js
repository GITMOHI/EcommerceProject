import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchLoggedInUserAsync,
  logout,
  logoutUserAsync,
  selectLoggedInUser,
} from "../Auth/authSlice";
import { selectCartItems } from "../cart/cartSlice";
import ProductCart from "../products/components/ProductCart";

function Navbar() {
  const navigate = useNavigate();
  const loggedInUser = useSelector(selectLoggedInUser);
  const items = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUserAsync());
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.length > 2) {
      setIsLoading(true);
      setShowModal(true);

      try {
        const apiUrl = `${process.env.REACT_APP_API_URL}/products/search/?q=${query}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSearchResults(data); // Assuming the backend returns an array of products
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setShowModal(false);
    }
  };

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "logout") {
        dispatch(logout());
        navigate("/login");
      } else if (event.key === "login") {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        if (loggedInUser) {
          // dispatch(fetchLoggedInUserAsync());
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch, navigate]);

  const handleProductClick = (productId) => {
    // Close the modal
    setShowModal(false);
    // Navigate to the product details page
    navigate(`/products/${productId}`);
  };

  return (
    <div>
      {/* Navbar */}
      <div className="navbar z-50 container mx-auto border-b pb-4 pt-2">
        <div className="flex-1 navbar-start mr-10">
          {/* Mobile Dropdown */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              aria-label="Open Menu"
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <Link to="/">Home</Link>
              <Link to="/products">Products</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/signup">Signup</Link>
            </ul>
          </div>
          <Link className="btn btn-ghost text-xl pl-0 ">
            <img src="/images/logo.png" className="w-28" alt="loading.." />
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex pl-8 navbar-center gap-6">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/signup" className="cursor-pointer">
            Signup
          </Link>
          <p className="truncate max-w-[150px] border-2 bg-base-100 text-black">
            {loggedInUser?.email}
          </p>
        </div>

        <div className="navbar-end flex-none gap-2">
          {/* Search */}
          <div className="form-control hidden md:flex">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {/* Cart */}
          <Link to="/cart">
            <div
              tabIndex={0}
              role="button"
              aria-label="Cart"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span
                  className={`badge badge-sm indicator-item ${
                    items?.length === 0 ? "hidden" : "block"
                  }`}
                >
                  {items?.length || ""}
                </span>
              </div>
            </div>
          </Link>

          {/* Profile Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              aria-label="Profile Menu"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src={
                    loggedInUser?.avatar || "https://via.placeholder.com/150"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li className="hover:bg-red-500 rounded-xl hover:text-white font-bold">
                <Link to="/profile">Profile</Link>
              </li>
              <li className="hover:bg-red-500 rounded-xl hover:text-white font-bold">
                {loggedInUser ? (
                  <p onClick={handleLogout}>Logout</p>
                ) : (
                  <p onClick={handleLogin}>Login</p>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-8 rounded-lg shadow-lg w-3/4 max-w-3xl h-3/4 overflow-auto">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <div className="loader">
                  <span className="loading loading-dots loading-xs"></span>
                  <span className="loading loading-dots loading-sm"></span>
                  <span className="loading loading-dots loading-md"></span>
                  <span className="loading loading-dots loading-lg"></span>
                </div>{" "}
                {/* Spinner */}
              </div>
            ) : searchResults.length === 0 ? (
              <p>No results found for "{searchTerm}"</p> // Display No Results Message
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[400px]">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product.id)} // Close modal and navigate
                  >
                    <ProductCart product={product} />
                  </div>
                ))}
              </div>
            )}
            <button
              className="absolute top-4 right-4 text-black text-lg font-bold"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
