import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./page/HomePage";
import AboutPage from "./page/AboutPage";
import Root from "./Root";
import Products from "./features/products/components/Products";
import ProductDetails from "./features/products/components/ProductDetails";
import LoginPage from "./page/LoginPage";
import SignupPage from "./page/SignupPage";
import { loginUserAsync, selectLoggedInUser, selectUserStatus } from "./features/Auth/authSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfilePage from "./page/ProfilePage";
import ProtectedRoute from "./page/common/ProtectedRoute";
import Cartpage from "./page/Cartpage";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import CheckoutPage from "./page/CheckoutPage";
import PaymentSuccess from "./page/common/PaymentSuccess";
import PaymentFailed from "./page/common/PaymentFailed";
import AdminLayout from "./page/Admin/AdminLayout";
import DashboardPage from "./page/Admin/DashboardPage";
import AdminLoginPage from "./page/Admin/AdminLoginPage";
import ProtectAdmin from "./page/Admin/ProtectAdmin";
import ForgotPassword from "./features/Auth/components/ForgotPassword";
import ResetPassword from "./features/Auth/components/ResetPassword";
import AddProductForm from "./page/Admin/operations/AddProductForm";
import CreateBrandForm from "./page/Admin/operations/CreateBrandForm";
import CreateCategoryForm from "./page/Admin/operations/CreateCategoryForm";
import EditProductForm from "./page/Admin/operations/EditProductForm";
import ProductListWithActions from "./page/Admin/ProductListWithActions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/products", element: <Products /> },
      { path: "/products/:id", element: <ProductDetails /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/forgot-password", element: <ForgotPassword/> },
      { path: "/reset-password/:token", element: <ResetPassword/> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/profile/*", element: <ProtectedRoute><ProfilePage /></ProtectedRoute> },
      { path: "/cart", element: <ProtectedRoute><Cartpage /></ProtectedRoute> },
      { path: "/checkout", element: <ProtectedRoute><CheckoutPage /></ProtectedRoute> },
      { path: '/payment/success/:tranId', element: <ProtectedRoute><PaymentSuccess /></ProtectedRoute> },
      { path: '/payment/failed/:tranId', element: <PaymentFailed /> },
      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          { path: "dash", element: <ProtectAdmin><DashboardPage /></ProtectAdmin> },
          { path: "login", element: <AdminLoginPage /> },
          { path: "operations/add-product", element: <ProtectAdmin><AddProductForm /></ProtectAdmin> },
          { path: "operations/add-brand", element: <ProtectAdmin><CreateBrandForm></CreateBrandForm></ProtectAdmin> },
          { path: "operations/add-category", element: <ProtectAdmin><CreateCategoryForm></CreateCategoryForm></ProtectAdmin> },
          { path: "operations/product-list", element: <ProtectAdmin><ProductListWithActions></ProductListWithActions></ProtectAdmin> },
          { path: "operations/edit-product", element: <ProtectAdmin><EditProductForm></EditProductForm></ProtectAdmin> },

        ],
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  const logoutStatus = useSelector(selectUserStatus);
  const loggedInUser = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (logoutStatus === 'succeeded') {
      window.location.href = '/'; // Redirect to login page after successful logout
    }
  }, [logoutStatus]);

  useEffect(() => {
    AOS.init();
    AOS.refresh();

    async function checkSession() {
      try {
        const response = await fetch("http://localhost:4040/auth/check", {
          credentials: "include",
        });
        if (response.ok) {
          const user = await response.json();
          dispatch(loginUserAsync.fulfilled(user));
        }
      } catch (error) {
        console.error("Session check failed", error);
      }
    }

    checkSession();
  }, [dispatch]);

  useEffect(() => {
    if (loggedInUser?.id) {
      dispatch(fetchItemsByUserIdAsync(loggedInUser.id));
    }
  }, [dispatch, loggedInUser]);

  // Add Tawk.to script loading useEffect
  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = 'https://embed.tawk.to/668c27b77a36f5aaec95c7dd/1i29nma2m'; // Replace with your Tawk.to widget ID
  //   script.async = true;
  //   script.charset = 'UTF-8';
  //   script.setAttribute('crossorigin', '*');
  //   document.body.appendChild(script);

  //   // Function to set Tawk.to attributes
  //   function setTawkAttributes() {
  //     if (window.Tawk_API && typeof window.Tawk_API.setAttributes === 'function') {
  //       window.Tawk_API.setAttributes({
  //         name: loggedInUser?.name,
  //         email: loggedInUser?.email,
  //         id: loggedInUser?.id, // Use a unique identifier here
  //       }, (error) => {
  //         if (error) {
  //           console.error('Error setting Tawk.to attributes:', error);
  //         } else {
  //           console.log('Tawk.to attributes set successfully');
  //         }
  //       });
  //     } else {
  //       console.error('Tawk_API or setAttributes is not available');
  //     }
  //   }

  //   // Set attributes once script has loaded
  //   script.onload = () => {
  //     console.log('Tawk.to script loaded');
  //     const intervalId = setInterval(() => {
  //       if (window.Tawk_API && typeof window.Tawk_API.setAttributes === 'function') {
  //         setTawkAttributes();
  //         clearInterval(intervalId);
  //       }
  //     }, 1000); // Retry every second
  //   };

  //   // Cleanup function to remove the script when the component unmounts
  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, [loggedInUser]); // Dependency on loggedInUser to update attributes when user changes

  return (
    <div className="App bg-slate-100 ">
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
