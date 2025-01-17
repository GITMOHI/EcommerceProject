import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchLoggedInUserAsync,
  selectLoggedInUser,
  selectUserStatus,
  updateUserAsync,
} from "../../Auth/authSlice";
import ConfirmationModal from "../../Auth/components/ConfirmationModal";

function MyProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedInUser = useSelector(selectLoggedInUser);
  const userStatus = useSelector(selectUserStatus);
  const [previewImage, setPreviewImage] = useState(loggedInUser?.image);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Added to programmatically set form values
  } = useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false); // State for address modal
  const [formData, setFormData] = useState(null);

  // functions....(handle all types of submissions)
  const onSubmit = (data) => {
    setFormData(data);
    setIsModalOpen(true);
  };

  // (sending the updated data to server....)
  const handleConfirm = async () => {
    const profileData = {
      name: formData.firstName + " " + formData.lastName,
      addresses: formData.addresses,
    };
    console.log("profile data  = ", profileData);

    const userId = loggedInUser?.id;
    if (userId) {
      dispatch(updateUserAsync({ userInfo: profileData, userId }));
    } else {
      console.error("User ID is undefined");
    }
    setIsModalOpen(false);
  };

  // modal pop down...
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // handle updated address data....
  const handleAddressSubmit = (addressData) => {
    const fullAddress = {
      street: addressData.street,
      city: addressData.city,
      state: addressData.state,
      postalCode: addressData.postalCode,
      country: addressData.country,
      phone: addressData.phone,
    };
    console.log(addressData);

    const profileData = {
      addresses: fullAddress,
    };
    console.log(profileData);
    const userId = loggedInUser?.id;
    if (userId) {
      dispatch(updateUserAsync({ userInfo: profileData, userId }));
    } else {
      console.error("User ID is undefined");
    }
    setValue("addresses", fullAddress); // Set the address object in the main form
    setIsAddressModalOpen(false);
  };

  //handle image update...
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/users/upload-image/${loggedInUser?.id}`,
          {
            method: "PATCH",
            body: formData,
          }
        );

        const result = await response.json();
        if (result?.image) {
          console.log("Image uploaded successfully:", result.image);
          setPreviewImage(result.image);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  
  // page rendering...............
  useEffect(() => {
    dispatch(fetchLoggedInUserAsync());
  },[dispatch]);
  useEffect(() => {
    if (!loggedInUser) {
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch, loggedInUser]);
  
  useEffect(() => {
    if (loggedInUser?.image) {
      setPreviewImage(loggedInUser?.image);
    }
  }, [loggedInUser]);

  if (userStatus === "loading") {
    return (
      <div className="flex flex-row justify-center">
        <span className="loading loading-spinner text-error  loading-lg"></span>
      </div>
    );
  }
  if (userStatus === "failed") {
    navigate("/login");
  }
  const { email, name, addresses } = loggedInUser || {};
  let [firstName, lastName] = (name?.split(" ") || ["", ""]);

  


  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-b border-gray-900/10 pb-12"
      >
        <div className="flex justify-center items-center mb-6">
          <div className="relative w-24 h-24">
            <label htmlFor="file-upload" className="cursor-pointer">
              <img
                src={previewImage || "/images/user.jpeg"}
                alt="User Profile"
                className="rounded-full w-full h-full object-cover"
              />
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            <button
              type="button"
              onClick={() => document.getElementById("file-upload").click()}
              className="absolute bottom-0 right-0 bg-gray-700 p-1 rounded-full text-white"
            >
              <PhotoIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <h2 className="text-base font-semibold leading-7 text-gray-900 text-center">
          Personal Information
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600 text-center">
          Use a permanent address where you can receive mail.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              First name
            </label>
            <div className="mt-2">
              <input
                defaultValue={firstName}
                type="text"
                name="firstName"
                id="first-name"
                autoComplete="given-name"
                {...register("firstName", {
                  required: "First name is required",
                })}
                className="bg-slate-200 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.firstName && (
                <span className="text-red-600 text-sm">
                  {errors.firstName.message}
                </span>
              )}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Last name
            </label>
            <div className="mt-2">
              <input
                defaultValue={lastName}
                type="text"
                name="lastName"
                id="last-name"
                autoComplete="family-name"
                {...register("lastName", { required: "Last name is required" })}
                className="bg-slate-200 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.lastName && (
                <span className="text-red-600 text-sm">
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                defaultValue={email}
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                readOnly
                className="bg-slate-200 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.email && (
                <span className="text-red-600 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Address
            </label>
            <div className="mt-2">
              <input
                readOnly
                value={`${loggedInUser?.addresses?.[0]?.street || ""}, ${
                  loggedInUser?.addresses?.[0]?.city || ""
                } ${loggedInUser?.addresses?.[0]?.state || ""} ${
                  loggedInUser?.addresses?.[0]?.postalCode || ""
                } ${loggedInUser?.addresses?.[0]?.country || ""}`}
                type="text"
                id="address"
                autoComplete="address"
                className="bg-slate-200 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.address && (
                <span className="text-red-600 text-sm">
                  {errors.address.message}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => setIsAddressModalOpen(true)}
              className="mt-2 text-xs text-blue-600 hover:underline"
            >
              Edit Address
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="bg-[#db4444] text-white font-semibold px-4 py-2 rounded-md hover:bg-[#b52a2a]"
          >
            Save Changes
          </button>
        </div>
      </form>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCancel}
        onConfirm={handleConfirm}
      />

      {isAddressModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Edit Address</h2>
            <form
              onSubmit={handleSubmit(handleAddressSubmit)}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="street"
                  className="block text-sm font-medium text-gray-700"
                >
                  Street
                </label>
                <input
                  type="text"
                  id="street"
                  {...register("street", { required: "Street is required" })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.street && (
                  <span className="text-red-600 text-sm">
                    {errors.street.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  {...register("city", { required: "City is required" })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.city && (
                  <span className="text-red-600 text-sm">
                    {errors.city.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  {...register("state", { required: "State is required" })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.state && (
                  <span className="text-red-600 text-sm">
                    {errors.state.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="postalCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  {...register("postalCode", {
                    required: "Postal Code is required",
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.postalCode && (
                  <span className="text-red-600 text-sm">
                    {errors.postalCode.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  {...register("country", { required: "Country is required" })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.country && (
                  <span className="text-red-600 text-sm">
                    {errors.country.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  {...register("phone", { required: "Phone is required" })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.phone && (
                  <span className="text-red-600 text-sm">
                    {errors.phone.message}
                  </span>
                )}
              </div>

              <div className="mt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#db4444] text-white px-4 py-2 rounded-md hover:bg-[#9e2929]"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default MyProfile;
