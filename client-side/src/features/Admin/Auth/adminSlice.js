import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllOrders, fetchMonthlyRevenue, fetchMonthlyUsers, fetchOrdersByCategory, fetchTotalUsers } from "./adminAPI";

const initialState = {
  adminData: {
    totalUsers: null,
    allOrders: null,
    monthlyUsers: null,
    monthlyRevenue:null,
    ordersByCategory:null,
  },
  status: "idle",
  error: null,
};

export const fetchTotalUsersAsync = createAsyncThunk(
  'admin/fetchTotalUsers',
  async () => {
    const response = await fetchTotalUsers();
    return response.data;
  }
);

export const fetchTotalOrdersAsync = createAsyncThunk(
  'admin/fetchTotalOrders',
  async () => {
    const response = await fetchAllOrders();
    return response.data;
  }
);

export const fetchMonthlyUsersAsync = createAsyncThunk(
  'admin/fetchMonthlyUsers',
  async () => {
    const response = await fetchMonthlyUsers();
    return response.data;
  }
);
export const fetchMonthlyRevenueAsync = createAsyncThunk(
  'admin/fetchMonthlyRevenue',
  async () => {
    const response = await fetchMonthlyRevenue();
    return response.data;
  }
);
export const fetchOrdersByCategoryAsync = createAsyncThunk(
  'admin/fetchOrdersByCategory',
  async () => {
    const response = await fetchOrdersByCategory();
    return response.data;
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchTotalUsersAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTotalUsersAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(fetchTotalUsersAsync.fulfilled, (state, action) => {
        state.adminData.totalUsers = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(fetchTotalOrdersAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTotalOrdersAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(fetchTotalOrdersAsync.fulfilled, (state, action) => {
        state.adminData.allOrders = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(fetchMonthlyUsersAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMonthlyUsersAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(fetchMonthlyUsersAsync.fulfilled, (state, action) => {
        state.adminData.monthlyUsers = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(fetchMonthlyRevenueAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMonthlyRevenueAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(fetchMonthlyRevenueAsync.fulfilled, (state, action) => {
        state.adminData.monthlyRevenue = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(fetchOrdersByCategoryAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchOrdersByCategoryAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(fetchOrdersByCategoryAsync.fulfilled, (state, action) => {
        state.adminData.ordersByCategory = action.payload;
        state.status = "succeeded";
        state.error = null;
      });
  },
});

// export const { resetSignupStatus } = adminSlice.actions;

export const selectAdminData= (state) => state.admin.adminData;


export default adminSlice.reducer;
