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

function AllOrders() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);
  const userStatus = useSelector(selectUserStatus);
  const navigate = useNavigate();
  const orders = useSelector(selectAllOrder);
  const orderStatus = useSelector(selectOrderStatus);

  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);

  useEffect(() => {
    if (loggedInUser) {
      dispatch(fetchOrdersByIdAsync(loggedInUser.id));
    }
  }, [dispatch, loggedInUser]);

  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const paginatedOrders = orders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (userStatus === "loading" || orderStatus === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-error loading-lg"></span>
      </div>
    );
  }

  if (userStatus === "failed") {
    navigate("/login");
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-[#db4444] mb-6">All Orders</h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-[#db4444] text-white text-center">
                  <th className="py-2 px-4">Order ID</th>
                  <th className="py-2 px-4">Items</th>
                  <th className="py-2 px-4">Total Amount</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Paid Status</th>
                  <th className="py-2 px-4">Address</th>
                  <th className="py-2 px-4">Order Date</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b text-center hover:bg-gray-100 transition"
                  >
                    <td className="py-2 px-4">{order.id}</td>
                    <td className="py-2 px-4">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-center mb-2"
                        >
                          <img
                            src={item.product.thumbnail}
                            alt={item.product.name}
                            className="w-12 h-12 rounded-full mr-2"
                          />
                          <div>
                            {item.quantity} x {item.product.name}
                          </div>
                        </div>
                      ))}
                    </td>
                    <td className="py-2 px-4">${order.totalAmount.toFixed(2)}</td>
                    <td
                      className={`py-2 px-4 ${
                        order.status === "pending"
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                    >
                      <span
                        className={`badge ${
                          order.status === "pending"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-green-200 text-green-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-2 px-4">
                      {order.paidStatus ? (
                        <span className="badge bg-green-200 text-green-800">Paid</span>
                      ) : (
                        <span className="badge bg-red-200 text-red-800">Unpaid</span>
                      )}
                    </td>
                    <td className="py-2 px-4">
                      {order.selectedAddress.street}, {order.selectedAddress.city},{" "}
                      {order.selectedAddress.state}, {order.selectedAddress.country}
                    </td>
                    <td className="py-2 px-4">
                      {moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-6">
            <div className="btn-group">
              {[...Array(totalPages).keys()].map((page) => (
                <button
                  key={page + 1}
                  className={`btn ${
                    currentPage === page + 1 ? "btn-active" : ""
                  }`}
                  onClick={() => handlePageChange(page + 1)}
                >
                  {page + 1}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AllOrders;
