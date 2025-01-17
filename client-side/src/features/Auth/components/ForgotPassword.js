import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';  // Importing checkmark icon from react-icons
import 'animate.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');  // Success message
  const [error, setError] = useState('');  // Error message from backend
  const [isSuccess, setIsSuccess] = useState(false);  // State to track success
  const [isLoading, setIsLoading] = useState(false);  // State to show loading during request

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email) {
      setError('Please enter a valid email.');
      return;
    }
  
    setIsLoading(true);  // Start loading state
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      const data = await response.json(); // Parsing the response JSON
      console.log(data); // Log the response data for debugging
  
      if (response.ok) {
        setMessage(data.message || 'Password reset email sent. Please check your inbox.');  // Using message from backend
        setIsSuccess(true);  // Set success state to true
        setError(''); // Clear any previous error messages
      } else {
        setError(data.message || 'Failed to send password reset email.'); // Use message from backend or default message
        setIsSuccess(false);  // Ensure success state is false if error occurs
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error sending email. Please try again later.');
      setIsSuccess(false);  // Ensure success state is false if error occurs
    } finally {
      setIsLoading(false);  // Stop loading state
    }
  };
  

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transition-all duration-500 ease-out">
        {/* Show the success message box after success */}
        {isSuccess ? (
          <div className="text-center animate__animated animate__fadeIn animate__faster">
            {/* Pop-up effect for the checkmark icon */}
            <div className="flex justify-center items-center animate__animated animate__zoomIn animate__faster">
              <FaCheckCircle className="text-green-500 text-6xl mb-4" />
            </div>
            {/* Pop-up effect for the success message */}
            <p className="text-lg font-semibold text-green-500 animate__animated animate__fadeIn animate__delay-1s">
              {message}
            </p>
          </div>
        ) : (
          <>
            {/* Form content */}
            <h2 className="text-2xl font-semibold text-[#db4444] mb-6 text-center">
              Forgot Password
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                  Enter your email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db4444]"
                  placeholder="Email Address"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>

              {error && <p className="text-sm text-red-500 mt-2">{error}</p>} {/* Display error message */}

              <button
                type="submit"
                className="w-full py-3 mt-4 bg-[#db4444] text-white font-semibold rounded-lg hover:bg-[#c13d3d] transition-colors duration-300"
                disabled={isLoading}  // Disable button while loading
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>

            <p className="mt-4 text-center text-gray-600">
              Remember your password?{' '}
              <a href="/login" className="text-[#db4444] hover:underline">
                Login here
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
