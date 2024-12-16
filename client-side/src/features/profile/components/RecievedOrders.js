import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrdersByIdAsync,
  selectAllOrder,
  selectOrderStatus,
} from "../../order/orderSlice";
import { selectLoggedInUser, selectUserStatus } from "../../Auth/authSlice";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function PendingOrders() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);
  const userStatus = useSelector(selectUserStatus);
  const navigate = useNavigate();
  const orders = useSelector(selectAllOrder);
  const orderStatus = useSelector(selectOrderStatus);

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

  const pendingOrders = orders.filter(order => order.status === "received");

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center text-[#db4444] mb-8">Recieved Orders</h1>
      {pendingOrders.length === 0 ? (
        <p className="text-center text-gray-500">No recieved orders found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingOrders.map((order) => (
            <div key={order.id} className="bg-white shadow-2xl rounded-lg py-8 px-3 border  hover:scale-105 duration-500 cursor-pointer ">
              <h2 className="text-xl font-bold mb-4">Order ID: {order.id}</h2>
              <div className="mb-4">
                <h3 className="font-semibold">Items:</h3>
                {order?.items?.map((item) => (
                  <div key={item.id} className="flex items-center mb-2">
                    <img src={item.product.thumbnail} alt={item.product.title} className="w-12 h-12 rounded-full mr-2" />
                    <div>
                      <p className="text-gray-700">{item.product.title}</p>
                      <p className="text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-lg font-semibold">Total Amount: ${order.totalAmount}</p>
              <p className="text-lg font-semibold">Status: {order.status}</p>
              <p className="text-lg font-semibold">Paid Status: {order.paidStatus ? "Paid" : "Unpaid"}</p>
              <div className="mt-4">
                <h3 className="font-semibold">Address:</h3>
                <p className="text-gray-700">{order.selectedAddress.street}</p>
                <p className="text-gray-700">{order.selectedAddress.city}, {order.selectedAddress.state}</p>
                <p className="text-gray-700">{order.selectedAddress.postalCode}, {order.selectedAddress.country}</p>
              </div>
              <p className="mt-4 text-gray-500">Order Date: {moment(order.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PendingOrders;
