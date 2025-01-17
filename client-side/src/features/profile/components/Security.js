import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchLoggedInUserActivityAsync,
  selectActivity,
  selectLoggedInUser,
} from "../../Auth/authSlice";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

function Security() {
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    watch: watchPassword,
    formState: { errors: errorsPassword },
  } = useForm();

  const loggedInUser = useSelector(selectLoggedInUser);
  const id = loggedInUser?.id;

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const activitiesPerPage = 9;

  const dispatch = useDispatch();

  const changePassword = async (dataPass) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/change_password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataPass),
          credentials: "include",
        }
      );

      const responseData = await response.json();
      console.log("Password change response: ", responseData);

      if (!response.ok) {
        throw new Error(responseData.message || "Password change failed");
      }

      return responseData;
    } catch (error) {
      throw error;
    }
  };

  const onSubmitPassword = async (data) => {
    console.log("Password Data:", data);

    try {
      const result = await changePassword(data);
      console.log("Result from changePassword:", result);

      toast.success("Successfully changed password", {
        position: "top-right",
      });
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error(
        error.message || "An error occurred while changing the password.",
        {
          position: "top-right",
        }
      );
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchLoggedInUserActivityAsync(id));
    }
  }, [id, dispatch]);

  const activities = useSelector(selectActivity) || [];

  // Pagination Logic
  const lastIndex = currentPage * activitiesPerPage;
  const firstIndex = lastIndex - activitiesPerPage;
  const currentActivities = activities.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(activities.length / activitiesPerPage);

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="border-b border-gray-900/10 pb-12 w-full max-w-4xl mx-auto">
      <ToastContainer />
      <h2 className="text-base font-semibold leading-7 text-gray-900 text-center mb-6">
        Security Settings
      </h2>

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Change Password</h3>
        <button
          type="button"
          className="bg-[#db4444] text-white px-4 py-2 rounded-md hover:bg-[#912929]"
          onClick={() => setIsChangingPassword(!isChangingPassword)}
        >
          {isChangingPassword ? "Cancel" : "Change Password"}
        </button>
      </div>

      {isChangingPassword && (
        <form onSubmit={handleSubmitPassword(onSubmitPassword)}>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mb-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="current-password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Current Password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  id="current-password"
                  {...registerPassword("currentPassword", {
                    required: "Current password is required",
                  })}
                  className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm"
                />
                {errorsPassword.currentPassword && (
                  <span className="text-red-600 text-sm">
                    {errorsPassword.currentPassword.message}
                  </span>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="new-password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                New Password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  id="new-password"
                  {...registerPassword("newPassword", {
                    required: "New password is required",
                  })}
                  className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm"
                />
                {errorsPassword.newPassword && (
                  <span className="text-red-600 text-sm">
                    {errorsPassword.newPassword.message}
                  </span>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm New Password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  id="confirm-password"
                  {...registerPassword("confirmPassword", {
                    required: "Please confirm your new password",
                    validate: (value) =>
                      value === watchPassword("newPassword") ||
                      "Passwords do not match",
                  })}
                  className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm"
                />
                {errorsPassword.confirmPassword && (
                  <span className="text-red-600 text-sm">
                    {errorsPassword.confirmPassword.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-[#db4444] text-white px-4 py-2 rounded-md hover:bg-[#8a1f1f]"
            >
              Save Password Changes
            </button>
          </div>
        </form>
      )}

      <div className="border-t border-gray-200 pt-6 mt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Recent Account Activity
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Device
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentActivities.map((activity) => (
                <tr key={activity._id}>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(activity.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {activity.activityType}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {activity.location || "Unknown Location"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {activity.device || "Unknown Device"}
                  </td>
                </tr>
              ))}
              {currentActivities.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No recent activities found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-4 space-x-4">
          <button
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
            className="flex items-center px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiArrowLeft className="mr-2" />
            Previous
          </button>
          <button
            onClick={() => handlePageChange("next")}
            disabled={currentPage === totalPages}
            className="flex items-center px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <FiArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Security;
