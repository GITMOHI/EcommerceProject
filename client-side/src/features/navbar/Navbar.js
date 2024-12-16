import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchLoggedInUserAsync, logout, logoutUserAsync, selectLoggedInUser } from "../Auth/authSlice";
import { selectCartItems } from "../cart/cartSlice";
import { useEffect } from "react";
// import {logo} from '../../../public/images/logo.png';

function Navbar() {
  const navigate = useNavigate();
  const loggedInUser = useSelector(selectLoggedInUser);
  const items = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUserAsync());
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'logout') {
        dispatch(logout());
        navigate('/login');
      } else if (event.key === 'login') {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        if (loggedInUser) {
          // dispatch(fetchLoggedInUserAsync());
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [dispatch, navigate]);

  return (
    <div className="">
      {/* Navbar */}
      <div className="navbar z-50 container mx-auto border-b pb-4 pt-2">
        <div className="flex-1 navbar-start mr-10">
          {/* Mobile Dropdown */}
          <div className="dropdown">
            <div tabIndex={0} role="button" aria-label="Open Menu" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <Link to="/">Home</Link>
              <Link to="/products">Products</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/signup">Signup</Link>
            </ul>
          </div>
          <Link className="btn btn-ghost text-xl pl-0 "><img src="/images/logo.png" className="w-28" alt="loading.." ></img></Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex pl-8 navbar-center gap-6">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/signup" className="cursor-pointer">Signup</Link>
          <p className="truncate max-w-[150px] border-2 bg-base-100 text-black">{loggedInUser?.email}</p>
        </div>

        <div className="navbar-end flex-none gap-2">
          {/* Search */}
          <div className="form-control hidden md:flex">
            <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
          </div>

          {/* Cart */}
          <Link to="/cart">
            <div tabIndex={0} role="button" aria-label="Cart" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className={`badge badge-sm indicator-item ${items?.length === 0 ? 'hidden' : 'block'}`}>
                  {items?.length || ""}
                </span>
              </div>
            </div>
          </Link>

          {/* Profile Dropdown */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" aria-label="Profile Menu" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="User Avatar" src={loggedInUser?.avatar || 'https://via.placeholder.com/150'} />
              </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
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
    </div>
  );
}

export default Navbar;
