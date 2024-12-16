import React from 'react';

function PaymentFailed() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 p-4">
            <div className="mb-6">
            <img src='/images/Failed.jpg' alt="Success" className="w-72 h-44 mx-auto" />
            </div>
            <h1 className="text-4xl font-bold text-[#db4444] mb-4">Payment Failed</h1>
            <p className="text-lg text-gray-700 mb-6">Unfortunately, we were unable to process your payment. Please try again.</p>
            <button 
                className="bg-[#db4444] text-white py-2 px-6 rounded-lg hover:bg-[#c93b3b] transition-colors"
                onClick={() => window.location.href = '/cart'}>
                Try Again
            </button>
        </div>
    );
}

export default PaymentFailed;
