import React, { useEffect } from "react";
import { FaUsers, FaDollarSign, FaBox, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { selectLoggedInUser } from "../../features/Auth/authSlice";
import { useNavigate } from "react-router-dom";
import {
  fetchMonthlyRevenueAsync,
  fetchMonthlyUsersAsync,
  fetchOrdersByCategoryAsync,
  fetchTotalOrdersAsync,
  fetchTotalUsersAsync,
  selectAdminData,
} from "../../features/Admin/Auth/adminSlice";

const DashboardPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("here.......");
    dispatch(fetchTotalOrdersAsync());
    dispatch(fetchTotalUsersAsync());
    dispatch(fetchMonthlyUsersAsync());
    dispatch(fetchMonthlyRevenueAsync());
    dispatch(fetchOrdersByCategoryAsync());
  }, [dispatch]);

  const adminData = useSelector(selectAdminData);
  const{totalUsers,allOrders,monthlyUsers,monthlyRevenue,ordersByCategory} = adminData || {};

  const totalSales = allOrders?.reduce((accumulator, order) => accumulator + order.totalAmount, 0) || 0;
  const pendingOrders = allOrders?.filter(order => order.status === 'pending') || [];


  // Placeholder data; replace with actual data fetching logic
  const data = {
    activeUsers: 10,
  };


  const monthlyActiveUsersData = monthlyUsers ? monthlyUsers.slice(0, 12).map((user) => ({
    period: user.period,
    users: user.activeUsers
  })) : []; // Use slice to limit to last 12 months

  const revenuePerMonthData = monthlyRevenue ? monthlyRevenue.slice(0, 12).map((rev) => ({
    period: rev.period,
    revenue: rev.totalRevenue
  })) : [];

  // Data for User Signup Sources
  const userSignupSourcesData = [
    { source: "Google", value: 400 },
    { source: "Instagram", value: 300 },
    { source: "Facebook Ads", value: 300 },
    { source: "Others", value: 100 },
  ];

  const ordersByCategoryData  =ordersByCategory?ordersByCategory.map((order) => ({
    category: order.category,
    orders: order.count
  })) : [];

  // Colors for Pie chart slices
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        <div className="flex flex-row space-x-4">
          <div className="bg-white shadow-lg p-4 rounded-lg flex-1 flex items-center">
            <FaUsers className="text-4xl text-blue-500 mr-4" />
            <div>
              <h2 className="text-lg font-bold">Total Users</h2>
              <p className="text-2xl">{totalUsers?.length}</p>
            </div>
          </div>
          <div className="bg-white shadow-lg p-4 rounded-lg flex-1 flex items-center">
            <FaDollarSign className="text-4xl text-green-500 mr-4" />
            <div>
              <h2 className="text-lg font-bold">Total Sales</h2>
              <p className="text-2xl">${totalSales}</p>
            </div>
          </div>
          <div className="bg-white shadow-lg p-4 rounded-lg flex-1 flex items-center">
            <FaBox className="text-4xl text-orange-500 mr-4" />
            <div>
              <h2 className="text-lg font-bold">Pending Orders</h2>
              <p className="text-2xl">{pendingOrders?.length}</p>
            </div>
          </div>
          <div className="bg-white shadow-lg p-4 rounded-lg flex-1 flex items-center">
            <FaUser className="text-4xl text-red-500 mr-4" />
            <div>
              <h2 className="text-lg font-bold">Active Users</h2>
              <p className="text-2xl">{data.activeUsers}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row space-x-4 mt-8">
          <div className="bg-white shadow-lg p-4 rounded-lg flex-1">
            <h2 className="text-lg font-bold">Monthly Active Users</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyActiveUsersData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#75c4c0"
                  strokeWidth={2}
                  dot={{ stroke: "#75c4c0", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white shadow-lg p-4 rounded-lg flex-1">
            <h2 className="text-lg font-bold">Revenue per Month</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenuePerMonthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#db4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex flex-row space-x-4 mt-8">
          <div className="bg-white shadow-lg p-4 rounded-lg flex-1">
            <h2 className="text-lg font-bold">User Signup Sources</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Count
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userSignupSourcesData.map((entry) => (
                    <tr key={entry.source}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {entry.source}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {entry.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-white shadow-lg p-4 rounded-lg flex-1">
            <h2 className="text-lg font-bold">Orders by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ordersByCategoryData}
                  dataKey="orders"
                  nameKey="category"
                  outerRadius={120} // Larger outer radius for bigger pie chart
                  innerRadius={60} // Space in the middle to make it a ring
                  fill="#82ca9d"
                  label
                >
                  {ordersByCategoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
