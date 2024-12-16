// LoginPage.js
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAsync, selectAuthError, selectLoggedInUser } from '../authSlice';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const authError = useSelector(selectAuthError);
  const loggedInUser = useSelector(selectLoggedInUser);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    dispatch(loginUserAsync(data));
  };
  useEffect(() => {
    if (loggedInUser?.id) {
      toast.success(
        `Welcome to shopZen, ${loggedInUser?.name ? loggedInUser.name : 'user'}`,
        {
          position: "top-center", // Centered at the top
          autoClose: 1800, // Duration in milliseconds
          hideProgressBar: true, // Hide the progress bar
          closeOnClick: true, // Close on click
          pauseOnHover: false, // Do not pause on hover
          draggable: false, // Disable dragging
          progress: undefined, // No progress bar
        }
      );
      navigate(from, { replace: true });
    }
  }, [loggedInUser, navigate, from]);

  return (
    <div className="hero min-h-screen bg-white border-green-800 p-0">
      <div className="hero-content flex-col-reverse md:flex-row p-0 gap-12">
        <div className="text-center lg:text-left">
          <img src="images/auth0.jpg" alt="loading.." />
        </div>
        <div className="card w-full max-w-sm bg-white shrink-0">
          <form className="card-body bg-white" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="font-bold text-3xl">Login to shopZen</h1>
            <p className="text-base font-semibold my-1 mb-6">Enter your details below</p>

            {authError && <span className="text-center text-red-600 text-sm">{authError}</span>}

            <div className="form-control border-b-2">
              <input
                autoComplete="off"
                type="email"
                placeholder="Enter Your Email..."
                className="bg-white border-none border-b-2 focus:outline-none focus:ring-0"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
            </div>

            <div className="form-control border-b-2 mt-4">
              <input
                autoComplete="off"
                type="password"
                placeholder="Enter your Password..."
                className="border-none focus:outline-none focus:ring-0"
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && <span className="text-red-600 text-sm">{errors.password.message}</span>}
            </div>

            <div className="form-control mt-6 flex flex-row justify-between">
              <button type="submit" className="hover:bg-[#b02e2e] btn bg-[#db4444] text-white font-semibold px-10 text-base">
                Log In
              </button>
              <div className="label">
                <Link to="/forgot-password" className="text-[#db4444] font-semibold text-sm label-text-alt link link-hover">
                  Forgot password?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
