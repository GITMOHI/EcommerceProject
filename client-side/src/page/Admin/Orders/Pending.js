import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Pending = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const ordersPerPage = 5;

  useEffect(() => {
    const fetchPendingOrders = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/pending`);
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setPendingOrders(data);
      } catch (err) {
        setError("Failed to fetch pending orders");
      } finally {
        setLoading(false);
      }
    };

    fetchPendingOrders();
  }, []);

  const handleStatusChange = async () => {
    if (!selectedOrderId) return;
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/setToReceived/${selectedOrderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "received" }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      setPendingOrders((prevOrders) => prevOrders.filter((order) => order.id !== selectedOrderId));
    } catch (err) {
      alert("Failed to update order status");
    } finally {
      setShowPopup(false);
      setSelectedOrderId(null);
    }
  };

  const openPopup = (orderId) => {
    setSelectedOrderId(orderId);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedOrderId(null);
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = pendingOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading pending orders...</div>
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
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Pending Orders</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentOrders.map((order) => (
          <motion.div
            key={order._id}
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

            <div className="border-t-2 border-gray-200 pt-4 mt-4">
              <p className="mb-1">
                <strong>User Name:</strong> {order.user?.name}
              </p>
              <p>
                <strong>User Email:</strong> {order.user?.email}
              </p>
            </div>

            <button
              onClick={() => openPopup(order.id)}
              className="mt-6 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-200"
            >
              Complete Order
            </button>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <ul className="inline-flex items-center space-x-3">
          {Array.from({ length: Math.ceil(pendingOrders.length / ordersPerPage) }, (_, index) => (
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

      {/* Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
            <p className="mb-6">Do you want to mark this order as complete?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleStatusChange}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Yes
              </button>
              <button
                onClick={closePopup}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pending;
