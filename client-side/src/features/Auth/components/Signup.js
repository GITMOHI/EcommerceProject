import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  resetSignupStatus,
  selectAuthError,
  selectLoggedInUser,
  selectSignedUp,
  signupUserAsync,
} from "../authSlice";
import { toast } from 'react-toastify';
function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const signedUp = useSelector(selectSignedUp);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(resetSignupStatus());
    dispatch(signupUserAsync(data));
  };
  const authError = useSelector(selectAuthError);

  useEffect(() => {
    if (signedUp) {
      toast.success("Registered Successfully!");
      dispatch(resetSignupStatus());
      navigate("/login");
     
    }
  }, [dispatch,signedUp]);

  return (
    <div className="hero min-h-screen bg-white border-green-800 p-0">
      <div className="hero-content flex-col-reverse md:flex-row p-0 gap-12">
        <div className="text-center lg:text-left">
          <img src="images/auth0.jpg" alt="loading.." />
        </div>

        <div className="card w-full max-w-sm bg-white shrink-0">
          <form
            className="card-body bg-white"
            onSubmit={handleSubmit(onSubmit)}
          >
            {authError && (
              <span className="text-center text-red-600 text-sm">
                {authError}
              </span>
            )}

            {signedUp ? (
              <p className="font-semibold text-green-700 text-base">
                Registered Successfully!!..redirecting..
              </p>
            ) : (
              <p></p>
            )}
            <h1 className="font-bold text-3xl">Create an account</h1>
            <p className="text-base font-semibold my-1 mb-6">
              Enter your details below
            </p>

            <div className="form-control border-b-2 ">
              <input
                autoComplete="off"
                type="text"
                placeholder="Enter Your Name..."
                className="bg-white border-none border-b-2 focus:outline-none focus:ring-0"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <span className="text-red-600 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="form-control border-b-2 ">
              <input
                autoComplete="off"
                type="email"
                placeholder="Enter Your Email..."
                className="bg-white border-none border-b-2 focus:outline-none focus:ring-0"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="text-red-600 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="form-control border-b-2 mt-4">
              <input
                autoComplete="off"
                type="password"
                placeholder="Enter your Password..."
                className="border-none focus:outline-none focus:ring-0"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <span className="text-red-600 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="form-control mt-6 ">
              <button
                type="submit"
                className="pb-3 pt-3 hover:bg-[#b02e2e] btn bg-[#db4444] text-white font-semibold px-10 text-base"
              >
                Create Account
              </button>
              <button
                type="submit"
                className="mt-4 my-1 btn btn-outline flex flex-row items-center gap-2  font-semibold px-10 text-base"
              >
                <FcGoogle className="text-xl"></FcGoogle> Sign up with google
              </button>
              <div className="label">
                <a
                  href="#"
                  className=" font-semibold text-sm label-text-alt link link-hover"
                >
                  All ready have an account?
                  <span>
                    <Link
                      className="ml-2 hover:text-red-500 underline"
                      to="/login"
                    >
                      Login
                    </Link>
                  </span>
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
