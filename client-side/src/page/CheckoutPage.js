// import { Form } from "react-router-dom";
import {
  PhotoIcon,
  UserCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import React from "react";
import { Fragment } from "react";
import { Dialog, ListboxOptions, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemFromCartAsync,
  selectCartItems,
  updateItemAsync,
} from "../features/cart/cartSlice";
import { useForm } from "react-hook-form";
import {
  addAddressAsync,
  selectLoggedInUser,
  updateUserAsync,
} from "../features/Auth/authSlice";
import { FaAngleDown, FaAngleUp, FaTimes } from "react-icons/fa";

// import {
//   createOrderAsync,
//   selectCurrentOrder,
//   selectCurrentOrderStatus,
// } from "../features/order/orderSlice";

function CheckoutPage() {
  const items = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const totalItems = (items ?? []).reduce(
    (total, item) => item.quantity + total,
    0
  );
  const totalAmount = (items ?? []).reduce(
    (amount, item) => item.product.price * item.quantity + amount,
    0
  );

  // react hook form..
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const user = useSelector(selectLoggedInUser);
  //   const current_order= useSelector(selectCurrentOrder);

  // payment method and select method..
  const [selectAddress, setSelectAddress] = useState(user?.addresses[0]);
  const [paymentMethod, setPaymentMethod] = useState("cash");


  const handleAddress = (e) => {
    const index_of_selected_address = e.target.value;
    setSelectAddress(user?.addresses[index_of_selected_address]);
  };

  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleDeleteAddress = (index) => {
    const updatedAddresses = user.addresses.filter((_, i) => i !== index);
    const profileData = {
      addresses: updatedAddresses,
    };
    console.log("updated = ", updatedAddresses);
    dispatch(
      updateUserAsync({
        userInfo: profileData,
        userId: user?.id,
      })
    );
  };
  const handleOrder = (e) => {
    const order = {
      items,
      totalAmount,
      totalItems,
      user: user.id,
      paymentMethod,
      selectedAddress: selectAddress,
      status: "pending",
    };
    console.log(order);


   //****payement ******///
   fetch("http://localhost:4040/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  }).then(res=>res.json())
  .then(data=>{
    window.location.replace(data.url);
  })


    // dispatch(createOrderAsync(order));
  };
  // console.log("order Placedddd = ", orderPlaced);

  const [open, setOpen] = useState("");

  return (
    <div className="container mx-auto mt-4">
      {/* {current_order && <Navigate to={`/orderSuccess/${current_order.id} `} replace={true}></Navigate>} */}

      <div className="mx-auto  px-4 sm:px-6 lg:px-8">
        {!items.length && <Navigate to="/"></Navigate>}
        <div className="grid grid-cols-1 gap-x-20 gap-y-10 lg:grid-cols-5">
          {/* details..(left div) */}
          <div className="lg:col-span-3 bg-red-500">
            <form
              className="bg-white px-5 py-5"
              noValidate
              onSubmit={handleSubmit((data) => {
                console.log(data);
                const profileData = {
                  addresses: data,
                };

                console.log("Profile Data = ", profileData);
                dispatch(
                  addAddressAsync({
                    addressData: profileData,
                    userId: user?.id,
                  })
                );
                reset();
              })}
            >
              <div>
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                    Billing Details
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("name", {
                            required: "Name is Required",
                          })}
                          id="name"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", {
                            required: "Email is Required",
                          })}
                          type="email"
                          autoComplete="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("phone", {
                            required: "Phone is Required",
                          })}
                          type="tel"
                          autoComplete="phone"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("street", {
                            required: "Street address is Required",
                          })}
                          id="street-address"
                          autoComplete="street"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("city", {
                            required: "City is Required",
                          })}
                          id="city"
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="division"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Division
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("state", {
                            required: "Division is Required",
                          })}
                          id="division"
                          autoComplete="division"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="postal-code"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("postalCode", {
                            required: "Post code is Required",
                          })}
                          id="postal-code"
                          autoComplete="postal-code"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-[#db4444] hover:scale-105 hover:duration-500  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#b62d2d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add address
                  </button>
                </div>

                {/* choose... */}

                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Address
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Choose from existing address
                  </p>
                  <ul role="list" className="divide-y divide-gray-100">
                    {user?.addresses?.map((address, index) => (
                      <li
                        key={address.postalCode}
                        className="flex justify-between items-center border-2 p-4 gap-x-6 py-5"
                      >
                        <div className="flex gap-3 md:items-start md:flex-row shrink-0 sm:flex sm:flex-col sm:items-end">
                          <div>
                            <input
                              onChange={(e) => handleAddress(e)}
                              id="address"
                              name="address"
                              type="radio"
                              value={index}
                              className="h-4 w-4 border-gray-300 text-[#db4444] focus:ring-[#db4444]"
                            />
                          </div>
                          <div>
                            <p className="text-sm leading-6 text-gray-900 font-bold text-left">
                              {address.street}
                            </p>
                            <p className="text-sm leading-6 text-gray-900 font-thin">
                              {address.city}, {address.state}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <div className="font-normal flex flex-row gap-2">
                              <span>Phone no: </span>
                              <p className="text-sm leading-6 text-gray-900">
                                {address.phone}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteAddress(index)}
                            className="text-red-500 hover:text-red-700"
                            aria-label="Delete address"
                          >
                            <XCircleIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>

                
                </div>
              </div>
            </form>
          </div>

          {/* orders..... (right div) */}
          <div className=" lg:col-span-2 mt-5 border p-6 h-fit bg-base-100 shadow-2xl rounded-md">
            <div className=" container mx-auto ">
              {!items?.length && <Navigate to="/product" />}
            
              <table className="table ">
                {/* head */}
                <thead>
                  <tr className="text-black font-bold text-sm">
                    <th>Product</th>
                    <th className="pl-32">Price</th>
               
                  </tr>
                </thead>
                <tbody className="">
                  {/* row 1 */}
                  {items?.map((item) => (
                    <tr key={item.id}>
                      <td className="">
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img
                                src={item.product?.thumbnail}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">
                              {item.product?.title}
                            </div>
                            <div className="text-sm opacity-50">
                              {item.product.category}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="pl-32">${item.product?.price}</td>
                   
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className=" mt-5 w-full">
               
                <div className="flex flex-row justify-between border-t w-full border-gray-400 pl-2 pt-5">
                   <p>Total Items: </p>
                   <p>{totalItems}</p>
                </div>
                <div className="flex flex-row justify-between  w-full border-gray-500 pl-2 pt-1">
                   <p>Total: </p>
                   <p>${totalAmount}</p>
                </div>
              </div>
              <div className="mt-10 space-y-10">
                    <fieldset>
                      <legend className="text-sm font-semibold leading-6 text-gray-900">
                        Payment Methods
                      </legend>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        These are delivered via SMS to your mobile phone.
                      </p>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            onChange={(e) => handlePayment(e)}
                            value="cash"
                            checked={paymentMethod === "cash"}
                            id="cash"
                            name="payments"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-[#db4444] focus:ring-[#db4444]"
                          />
                          <label
                            htmlFor="cash"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Cash
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            onChange={(e) => handlePayment(e)}
                            value="card"
                            checked={paymentMethod === "card"}
                            id="card"
                            name="payments"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-[#db4444] focus:ring-[#db4444]"
                          />
                          <label
                            htmlFor="card"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Card Payment
                          </label>
                        </div>
                      </div>
                    </fieldset>
              </div>

              <button onClick={handleOrder} className="btn mt-8 mb-4 text-white text-sm w-full  bg-[#db4444] hover:bg-[#cc3535] hover:scale-105 duration-700">Place Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
