import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // For extracting token from URL
import { toast, ToastContainer } from 'react-toastify'; // Importing toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importing Toastify styles

const ResetPassword = () => {
  const { token } = useParams(); // Extract reset token from URL
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // You can add token validation or other logic to check if the token is valid when the component mounts.
    if (!token) {
      setError('Invalid or missing token.');
    }
  }, [token]);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    if (name === 'newPassword') setNewPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError('Both password fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true); 

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json(); 
      console.log(data);

      if (response.ok) {
        setSuccessMessage('Password successfully updated.');
        toast.success('Password successfully updated. Redirecting to login...'); // Show success toast
        setTimeout(() => {
          navigate('/login'); // Redirect to login page after success
        }, 2000);
      } else {
        setError(data.message || 'Failed to reset the password.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error resetting password. Please try again later.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transition-all duration-500 ease-out">
        {successMessage ? (
          <div className="text-center animate__animated animate__fadeIn animate__faster">
            <p className="text-lg font-semibold text-green-500">{successMessage}</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-[#db4444] mb-6 text-center">Reset Password</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-lg font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db4444]"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={handlePasswordChange}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-lg font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db4444]"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handlePasswordChange}
                />
              </div>

              {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

              <button
                type="submit"
                className="w-full py-3 mt-4 bg-[#db4444] text-white font-semibold rounded-lg hover:bg-[#c13d3d] transition-colors duration-300"
                disabled={isLoading}
              >
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>

            <p className="mt-4 text-center text-gray-600">
              Remembered your password?{' '}
              <a href="/login" className="text-[#db4444] hover:underline">
                Login here
              </a>
            </p>
          </>
        )}
      </div>

      {/* ToastContainer to show the toasts */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default ResetPassword;
