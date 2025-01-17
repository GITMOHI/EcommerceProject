import React, { useEffect, useState } from "react";
import { Dialog, ListboxOptions, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemFromCartAsync,
  fetchItemsByUserIdAsync,
  selectCartItemStatus,
  selectCartItems,
  updateItemAsync,
} from "./cartSlice";
import { fetchItemsByUserId } from "./cartAPI";
import {
  fetchLoggedInUserAsync,
  selectLoggedInUser,
  selectUserStatus,
} from "../Auth/authSlice";
import { fetchLoggedInUser } from "../Auth/authAPI";
import { FaAngleUp, FaAngleDown, FaTimes } from "react-icons/fa";

export function Cart() {
  const [open, setOpen] = useState(true);
  const items = useSelector(selectCartItems);
  const loggedInUser = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStatus = useSelector(selectUserStatus);
  const itemStatus = useSelector(selectCartItemStatus);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    dispatch(fetchLoggedInUserAsync());
  }, [dispatch]);

  useEffect(() => {
    if (loggedInUser?.id) {
      dispatch(fetchItemsByUserIdAsync(loggedInUser.id));
    }
  }, [dispatch, loggedInUser]);

  useEffect(() => {
    const initialQuantities = {};
    items?.forEach(item => {
      initialQuantities[item.id] = item.quantity;
    });
    setQuantities(initialQuantities);
  }, [items]);

  if (userStatus === "loading" || itemStatus === "loading") {
    return (
      <div className="flex flex-row justify-center">
        <span className="loading loading-spinner text-error loading-lg"></span>
      </div>
    );
  }

  if (!loggedInUser) {
    navigate("/login");
  }

  const totalItems = (items ?? []).reduce(
    (total, item) => quantities[item.id] + total,
    0
  );
  const totalAmount = (items ?? []).reduce(
    (amount, item) => item?.product?.price * quantities[item.id] + amount,
    0
  );

  const handleQuantity = (itemId, increment) => {
    setQuantities(prevQuantities => {
      const newQuantities = { ...prevQuantities };
      const item = items.find(item => item.id === itemId);
  
      if (item) {
        const newQuantity = (newQuantities[itemId] || 0) + increment;
        if (newQuantity >= 1 && newQuantity <= item.product.stock) {
          newQuantities[itemId] = newQuantity;
        } else if (newQuantity < 1) {
          newQuantities[itemId] = 1;
        }
      }
  
      return newQuantities;
    });
  };
  

  const handleRemove = (itemId) => {
    dispatch(deleteItemFromCartAsync(itemId));
  };

  const handleCheckout = () => {
    Object.keys(quantities).forEach(itemId => {
      const item = items?.find(item => item.id === itemId);
      if (item && item.quantity !== quantities[itemId]) {
        dispatch(updateItemAsync({ id: itemId, quantity: quantities[itemId] }));
      }
    });
    // Proceed to checkout logic
    navigate("/checkout");
  };

  return (
    <div className="overflow-x-auto container mx-auto ">
      {!items?.length && <Navigate to="/" />}
      <p className="my-8">
        <span className="text-gray-400">Home</span>/Cart
      </p>
      <table className="table ">
        {/* head */}
        <thead>
          <tr className="text-black font-bold text-sm">
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody className="">
          {/* row 1 */}
          {items?.map((item) => (
            <tr key={item.id}>
              <td>
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
                    <div className="font-bold">{item.product?.title}</div>
                    <div className="text-sm opacity-50">
                      {item.product.category}
                    </div>
                  </div>
                </div>
              </td>
              <td>${item.product?.price}</td>
              <td>
                <div className="text-gray-500 flex flex-row space-x-3 items-center">
                  <p className="font-bold">Qty </p>
                  <div className="flex items-center space-x-2">
                    <button
                      className="btn btn-xs btn-outline"
                      onClick={() => handleQuantity(item.id, 1)}
                    >
                      <FaAngleUp />
                    </button>
                    <span>{quantities[item.id]}</span>
                    <button
                      className="btn btn-xs btn-outline"
                      onClick={() => handleQuantity(item.id, -1)}
                    >
                      <FaAngleDown />
                    </button>
                  </div>
                </div>
              </td>
              <th>
                <button className="btn btn-ghost btn-xs">
                  ${quantities[item.id] * item.product?.price}
                </button>
              </th>
              <th>
                <button
                  className="btn btn-ghost btn-xs text-red-600"
                  onClick={() => handleRemove(item.id)}
                >
                  <FaTimes />
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-row justify-between mt-5">
        <Link to="/products">
          <button className="btn px-4 rounded-sm btn-outline hover:bg-[#db4444] hover:border-none">
            Return to Shop
          </button>
        </Link>
      </div>

      <div className="flex flex-row gap-48 mt-16 items-start">
        <div className="w-4/12">
          <input
            className="input input-bordered rounded-md border-black"
            placeholder="Coupon Code "
          />
          <button className="btn rounded-md bg-[#db4444] text-sm hover:bg-[#a73030] ml-5 text-white">
            Apply Coupon
          </button>
        </div>

        <div className="max-w-md mx-auto w-8/12">
          <div className="border border-black rounded-md p-4">
            <h3 className="font-bold text-lg mb-4">Cart Total</h3>
            <div className="flex mb-2">
              <span className="min-w-[300px]">Total Items:</span>
              <span>{totalItems}</span>
            </div>
            <div className="flex mb-2">
              <span className="min-w-[300px]">Total Amount:</span>
              <span>${totalAmount}</span>
            </div>
            <div className="flex mb-2">
              <span className="min-w-[300px]">Shipping:</span>
              <span>Free</span>
            </div>
            <hr className="my-4" />
            <div className="flex font-semibold">
              <span className="min-w-[300px]">Total:</span>
              <span>${totalAmount}</span>
            </div>

            <div className="flex flex-row justify-center items-center my-7 ">
              <button
                className="btn rounded-md px-4 text-md btn-wide text-white hover:bg-[#a73030] bg-[#db4444] hover:border-none"
                onClick={handleCheckout}
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
