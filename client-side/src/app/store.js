import { configureStore } from '@reduxjs/toolkit';
import bestSellingReducer from '../features/bestsellingproduct/bestSellingSlice';
import productsReducer from '../features/products/productSlice';
import authsReducer from '../features/Auth/authSlice';
import cartsReducer from '../features/cart/cartSlice';
import ordersReducer from '../features/order/orderSlice';
import adminReducer from '../features/Admin/Auth/adminSlice';

export const store = configureStore({
  reducer: {
    bestSelling: bestSellingReducer,
    products: productsReducer,
    auth: authsReducer,
    cart: cartsReducer,
    orders:ordersReducer,
    admin: adminReducer,
  },
});
