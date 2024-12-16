import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrdersByIdAsync,
  selectAllOrder,
  selectOrderStatus,
} from "../../order/orderSlice";
import { selectLoggedInUser, selectUserStatus } from "../../Auth/authSlice";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function PendingOrders() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);
  const userStatus = useSelector(selectUserStatus);
  const navigate = useNavigate();
  const orders = useSelector(selectAllOrder);
  const orderStatus = useSelector(selectOrderStatus);

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6;

  useEffect(() => {
    if (loggedInUser) {
      dispatch(fetchOrdersByIdAsync(loggedInUser.id));
    }
  }, [dispatch, loggedInUser]);

  if (userStatus === "loading" || orderStatus === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-error loading-lg"></span>
      </div>
    );
  }
  if (userStatus === "failed") {
    navigate("/login");
  }

  const pendingOrders = orders.filter((order) => order.status === "pending");

  // Pagination Logic
  const totalPages = Math.ceil(pendingOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const currentOrders = pendingOrders.slice(startIndex, startIndex + ordersPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container mx-auto pt-0 -top-5 p-4">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-[#db4444] mb-8">
        Pending Orders
      </h1>
      {currentOrders.length === 0 ? (
        <p className="text-center text-gray-500">No pending orders found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {currentOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white shadow-lg hover:shadow-xl rounded-lg p-5 border border-gray-200 hover:border-[#db4444] transition-all duration-300 transform hover:scale-105"
              >
                {/* Order ID */}
                <h2 className="text-sm sm:text-base font-semibold text-gray-700 mb-4">
                  <span className="bg-[#db4444] text-white px-2 py-1 rounded">
                    Order ID: {order.id}
                  </span>
                </h2>

                {/* Order Items */}
                <div className="mb-4">
                  <h3 className="font-medium text-gray-800 mb-2">Items:</h3>
                  {order?.items?.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 border-b pb-2 mb-2 last:border-b-0 last:pb-0"
                    >
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        className="w-10 h-10 rounded-md object-cover border"
                      />
                      <div>
                        <p className="text-gray-700 text-sm">
                          {item.product.title}
                        </p>
                        <p className="text-gray-500 text-xs">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Info */}
                <p className="text-sm text-gray-800 mb-1">
                  <span className="font-medium">Total Amount:</span> $
                  {order.totalAmount}
                </p>
                <p className="text-sm text-gray-800 mb-1">
                  <span className="font-medium">Status:</span> {order.status}
                </p>
                <p className="text-sm text-gray-800 mb-4">
                  <span className="font-medium">Paid Status:</span>{" "}
                  {order.paidStatus ? "Paid" : "Unpaid"}
                </p>

                {/* Address */}
                <div className="bg-gray-50 p-3 rounded-lg border">
                  <h4 className="text-sm font-medium mb-2">Address:</h4>
                  <p className="text-gray-700 text-sm">
                    {order.selectedAddress.street}
                  </p>
                  <p className="text-gray-700 text-sm">
                    {order.selectedAddress.city}, {order.selectedAddress.state}
                  </p>
                  <p className="text-gray-700 text-sm">
                    {order.selectedAddress.postalCode},{" "}
                    {order.selectedAddress.country}
                  </p>
                </div>

                {/* Order Date */}
                <p className="mt-4 text-gray-500 text-xs">
                  Order Date:{" "}
                  {moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                </p>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded bg-gray-200 hover:bg-[#db4444] hover:text-white transition-all duration-200 ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <FaArrowLeft className="inline mr-1" />
              Prev
            </button>
            <p className="text-gray-700">
              Page {currentPage} of {totalPages}
            </p>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded bg-gray-200 hover:bg-[#db4444] hover:text-white transition-all duration-200 ${
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Next
              <FaArrowRight className="inline ml-1" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default PendingOrders;
