import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchItemsByUserIdAsync, resetCartAsync, selectCartItems } from '../../features/cart/cartSlice';
import { selectLoggedInUser } from '../../features/Auth/authSlice';

function PaymentSuccess() {
    const { tranId } = useParams();  // Extract transaction ID from URL parameters
    const loggedInUser = useSelector(selectLoggedInUser);  // Get logged-in user from Redux store
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);  // Get cart items from Redux store

    // useEffect to send tranId to the backend
    useEffect(() => {
        const sendTransactionData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/decrease_stock`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ tranId }),  // Send only tranId to backend
                });

                if (!response.ok) {
                    throw new Error('Failed to send transaction data');
                }

                console.log('Transaction data sent successfully');
            } catch (error) {
                console.error('Error sending transaction data:', error);
            }
        };

        if (tranId) {
            sendTransactionData();  // Trigger the API call to send tranId
        }
    }, [tranId]);  // Trigger when tranId is available

    // useEffect to reset the cart
    useEffect(() => {
        if (loggedInUser?.id) {
            dispatch(resetCartAsync(loggedInUser?.id));  // Reset the cart for the logged-in user
        }
    }, [loggedInUser?.id, dispatch]);  // Trigger when loggedInUser's ID is available

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
