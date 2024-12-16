import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaBell } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Navbar from "./Navbar";
import { logout } from "../../features/Auth/authSlice";

const AdminLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const getPageTitle = (pathname) => {
    const pageTitles = {
      "/admin": "Dashboard",
      "/admin/leads": "Leads",
      "/admin/transactions": "Transactions",
      "/admin/operations/add-roduct": "Add Product",
      "/admin/forgot-password": "Forgot Password",
    };
    return pageTitles[pathname] || "Page";
  };

  useEffect(() => {
    const handleLogoutEvent = (event) => {
      if (event.key === "logout") {
        dispatch(logout());
        navigate("/login");
      }
    };
    window.addEventListener("storage", handleLogoutEvent);
    return () => {
      window.removeEventListener("storage", handleLogoutEvent);
    };
  }, [dispatch, navigate]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden lg:block fixed top-0 left-0 h-full w-72 bg-gray-800 text-white">
        <Navbar />
      </aside>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={toggleDrawer}
          ></div>
          {/* Drawer Content */}
          <div className="relative bg-gray-800 text-white w-64 h-full">
            <Navbar />
          </div>
        </div>
      )}

      {/* Drawer Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-full"
        onClick={toggleDrawer}
      >
        <FaBars />
      </button>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col bg-gray-100">
        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow-md py-4 px-6">
          <h1 className="text-xl font-semibold">{getPageTitle(location.pathname)}</h1>
          <div className="flex items-center gap-4">
            <FaBell className="text-2xl text-gray-700 cursor-pointer" />
            <div className="w-10 h-10 rounded-full overflow-hidden border">
              <img
                src="/path/to/avatar.jpg"
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
