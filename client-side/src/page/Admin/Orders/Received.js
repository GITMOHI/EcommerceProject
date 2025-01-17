import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Received = () => {
  const [receivedOrders, setReceivedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    const fetchReceivedOrders = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/received`);
        if (!response.ok) {
          throw new Error("Failed to fetch received orders");
        }
        const data = await response.json();
        setReceivedOrders(data);
      } catch (err) {
        setError("Failed to fetch received orders");
      } finally {
        setLoading(false);
      }
    };

    fetchReceivedOrders();
  }, []);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = receivedOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading received orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center mt-6">
        <h2 className="font-bold">{error}</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Received Orders</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentOrders.map((order) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-300 transform hover:scale-105 hover:shadow-2xl transition-all"
          >
            <h2 className="text-xl font-semibold mb-3 text-gray-900">Order ID: {order.id}</h2>
            <p className="mb-2">
              <strong>Total Amount:</strong> ${order.totalAmount}
            </p>
            <p className="mb-2">
              <strong>Status:</strong> {order.status}
            </p>
            <p className="mb-2">
              <strong>Transaction ID:</strong> {order.tranjectionId}
            </p>
            <p className="mb-2">
              <strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}
            </p>
            <p className="mb-4">
              <strong>Address:</strong> {order.selectedAddress.street}, {order.selectedAddress.city}
            </p>

            {/* Order Items with Scrolling */}
            <div
              className={`mb-4 ${order.items.length > 3 ? "overflow-y-auto max-h-32" : ""}`}
              style={{ scrollbarWidth: "thin", scrollbarColor: "#888 #f1f1f1" }}
            >
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

            {/* User Info */}
            <div className="border-t-2 border-gray-200 pt-4 mt-4">
              <p className="mb-1">
                <strong>User Name:</strong> {order.user?.name}
              </p>
              <p>
                <strong>User Email:</strong> {order.user?.email}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <ul className="inline-flex items-center space-x-3">
          {Array.from({ length: Math.ceil(receivedOrders.length / ordersPerPage) }, (_, index) => (
            <li key={index}>
              <button
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 border-2 rounded-full text-sm ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Received;
