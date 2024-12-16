// LoginPage.js
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { loginAdminAsync, selectAuthError, selectLoggedInUser } from '../../Auth/authSlice';

function AdminLogin() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const authError = useSelector(selectAuthError);
  const loggedInUser = useSelector(selectLoggedInUser);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = async(data) => {
    dispatch(loginAdminAsync(data));
  };
  

  useEffect(() => {

    console.log("Login Admin");
    if (loggedInUser?.id && loggedInUser?.role==='admin') {
      toast.success(
        `Welcome to shopZen, ${loggedInUser?.name ? loggedInUser.name : 'user'}`,
        {
          position: "top-center",
          autoClose: 1800,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        }
      );
      navigate('/admin');
    }
  }, [loggedInUser, navigate, from]);

  

  return (
 
    <div className="hero min-h-screen p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="hero-content flex-col-reverse md:flex-row p-0 gap-12"
      >
        <div className="card w-full max-w-sm bg-white bg-opacity-80 shadow-2xl border-2 rounded-lg overflow-hidden">
          <form className="card-body bg-white" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="font-bold text-3xl text-center text-blue-900">Admin Login</h1>
            <p className="text-base font-semibold my-1 mb-6 text-center text-gray-700">Enter your details below</p>

            {authError && <span className="text-center text-red-600 text-sm">{authError}</span>}

            <div className="form-control border-b-2 mb-4">
              <motion.input
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                autoComplete="off"
                type="email"
                placeholder="Enter Your Email..."
                className="bg-white border-none border-b-2 focus:outline-none focus:ring-0 py-2 px-4"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
            </div>

            <div className="form-control border-b-2 mb-6">
              <motion.input
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                autoComplete="off"
                type="password"
                placeholder="Enter your Password..."
                className="border-none focus:outline-none focus:ring-0 py-2 px-4"
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && <span className="text-red-600 text-sm">{errors.password.message}</span>}
            </div>

            <div className="form-control mt-6 flex flex-row gap-5 justify-between items-center">
              <motion.button
                type="submit"
                className="hover:bg-red-600 btn bg-red-500 text-white font-semibold px-10 text-base rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Log In
              </motion.button>
              <motion.div className="label " initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}>
                <a href="#" className="text-red-500 font-semibold text-sm label-text-alt link link-hover">
                  Forgot password?
                </a>
              </motion.div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default AdminLogin;
