import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { resetCartAsync } from '../../features/cart/cartSlice';
import { selectLoggedInUser } from '../../features/Auth/authSlice';

function PaymentSuccess() {

    const {tranId} = useParams();
    const loggedInUser = useSelector(selectLoggedInUser);
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(resetCartAsync(loggedInUser?.id))
    },[dispatch])
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 p-4">
            <div className="mb-6">
                <img src='/images/Success.jpg' alt="Success" className="w-32 h-32 mx-auto" />
            </div>
            <h1 className="text-4xl font-bold text-[#db4444] mb-4">Payment Successful!</h1>
            <p className="text-lg text-gray-700 mb-6">Your order has been placed successfully. Thank you for your purchase!</p>
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <p className="text-gray-800">Transaction ID: <strong>{tranId}</strong></p>
            </div>
            <button 
                className="bg-[#db4444] text-white py-2 px-6 rounded-lg hover:bg-[#c93b3b] transition-colors"
                onClick={() => window.location.href = '/products'}>
                Continue Shopping
            </button>
        </div>
    );
}

export default PaymentSuccess;
