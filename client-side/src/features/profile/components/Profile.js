import { NavLink, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { FaUser, FaLock, FaCog } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useState } from "react";
import { selectLoggedInUser } from "../../Auth/authSlice";
import MyProfile from "./MyProfile";
import Security from "./Security";
import AllOrders from "./AllOrders";
import { FaBagShopping } from "react-icons/fa6";
import PendingOrders from "./PendingOrders";
import RecievedOrders from "./RecievedOrders";
import RecommendedProducts from "../../Recommended/RecommendedProducts";

function Profile() {
  const location = useLocation();
  const loggedInUser = useSelector(selectLoggedInUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Mock recommended products (replace with actual data fetching logic)
  const recommendedProducts = [
    { id: 1, name: "Wireless Headphones", price: 99.99, image: "headphones.jpg" },
    { id: 2, name: "Smartphone Case", price: 19.99, image: "case.jpg" },
    { id: 3, name: "Portable Charger", price: 29.99, image: "charger.jpg" },
  ];

  const getCurrentPathName = () => {
    switch (location.pathname) {
      case "/profile/myProfile":
        return "My Profile";
      case "/profile/security":
        return "Security";
      case "/profile/pendingOrders":
        return "Pending Orders";
      case "/profile/allOrders":
        return "All Orders";
      case "/profile/recievedOrders":
        return "Recieved Orders";
      default:
        return "Profile";
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 relative">
      {/* Breadcrumb and Welcome Section */}
      <div className="flex flex-row justify-between items-center sticky top-0 bg-white z-30 py-4 shadow-md md:shadow-none">
        <p>
          <span className="text-gray-500">Home / </span>
          <span className="font-semibold">{getCurrentPathName()}</span>
        </p>
        <p>
          Welcome <span className="text-red-500 font-semibold">{loggedInUser?.name || "user"}</span>
        </p>
        {/* Hamburger Icon for Mobile */}
        <button
          className="block md:hidden text-gray-600 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      <div className="flex flex-col md:flex-row mt-6">
        {/* Vertical Navbar */}
        <div
          className={`w-full md:w-1/5 max-w-xs space-y-16 bg-white md:bg-transparent md:static absolute z-40 top-0 md:top-auto left-0 p-4 md:p-0 md:space-y-0 h-full md:h-auto overflow-y-auto transition-transform transform md:translate-x-0 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:sticky md:top-40 md:h-screen`}
        >
          <nav className="mb-8">
            <h1 className="font-bold">Manage My Account</h1>
            <ul className="space-y-4 text-gray-400 ml-4 mt-3">
              <li>
                <NavLink
                  to="myProfile"
                  className={({ isActive }) => `flex items-center ${isActive ? "text-red-500" : ""}`}
                >
                  <FaUser className="mr-2" /> My Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="security"
                  className={({ isActive }) => `flex items-center ${isActive ? "text-red-500" : ""}`}
                >
                  <FaLock className="mr-2" /> Security
                </NavLink>
              </li>
            </ul>
          </nav>

          <nav>
            <h1 className="font-bold">My Orders</h1>
            <ul className="space-y-4 text-gray-400 ml-4 mt-3">
              <li>
                <NavLink
                  to="allOrders"
                  className={({ isActive }) => `flex items-center ${isActive ? "text-red-500" : ""}`}
                >
                  <FaBagShopping className="mr-2" /> All Orders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="pendingOrders"
                  className={({ isActive }) => `flex items-center ${isActive ? "text-red-500" : ""}`}
                >
                  <FaCog className="mr-2" /> Pending
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="recievedOrders"
                  className={({ isActive }) => `mb-8 flex items-center ${isActive ? "text-red-500" : ""}`}
                >
                  <FaLock className="mr-2" /> Recieved
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        {/* Content */}
        <div className="w-full md:w-4/5 md:-m-8 p-4 md:p-8">
          <Routes>
            <Route path="" element={<Navigate to="myProfile" />} />
            <Route path="myProfile" element={<MyProfile />} />
            <Route path="security" element={<Security />} />
            <Route path="allOrders" element={<AllOrders />} />
            <Route path="pendingOrders" element={<PendingOrders />} />
            <Route path="recievedOrders" element={<RecievedOrders />} />
          </Routes>

          {/* Recommended Products Section */}
          <div className="mt-12">
            <h1 className="text-xl font-bold mb-4">Recommended for You</h1>
            <RecommendedProducts products={recommendedProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
