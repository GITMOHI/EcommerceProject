import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder, updateOrder } from "./orderAPI";
import { fetchOrdersById } from "./orderAPI";

const initialState = {
    status:'idle',
    orders:[],
    currentOrder:null,
    totalOrders:0,
    error:null
}



export const createOrderAsync = createAsyncThunk('orders/createOrder',
    async(order)=>{
        const response = await createOrder(order);
        return response.data;
    }
)

// export const fetchAllOrdersAsync = createAsyncThunk('orders/fetchAllOrders',
//     async()=>{
//         const response = await fetchAllOrders();
//         return response.data;
//     }
// )
export const fetchOrdersByIdAsync = createAsyncThunk('orders/fetchOrdersById',
    async(id)=>{
        const response = await fetchOrdersById(id);
        return response.data;
    }
)


export const updateOrderAsync = createAsyncThunk('orders/updateOrder',
    async(order)=>{
        const response = await updateOrder(order);
        return response.data;
    }
)




export const orderSlice = createSlice({
     name:'orders',
     initialState,
     reducers:{
        resetOrder:(state)=>{
            state.currentOrder = null;
        }
     },
     extraReducers:(builder)=>{
        builder
           .addCase(createOrderAsync.pending,(state)=>{
               state.status = 'pending';
           })
           .addCase(createOrderAsync.fulfilled,(state,action)=>{
               state.status = 'idle';
               state.orders.push(action.payload);
               state.currentOrder = action.payload;
           })
           .addCase(fetchOrdersByIdAsync.pending,(state)=>{
               state.status = 'pending';
           })
           .addCase(fetchOrdersByIdAsync.fulfilled,(state,action)=>{
               state.status = 'idle';
               state.orders = action.payload;
           })
           .addCase(fetchOrdersByIdAsync.rejected,(state,action)=>{
               state.status = 'idle';
               state.orders = null;
               state.error = action.payload;
           })
        //    .addCase(fetchAllOrdersAsync.pending,(state)=>{
        //        state.status = 'pending';
        //    })
        //    .addCase(fetchAllOrdersAsync.fulfilled,(state,action)=>{
        //        state.status = 'idle';
        //        state.orders = action.payload.orders;
        //        state.totalOrders = action.payload.totalOrders;
        //    })
           .addCase(updateOrderAsync.pending,(state)=>{
               state.status = 'pending';
           })
           .addCase(updateOrderAsync.fulfilled,(state,action)=>{
               state.status = 'idle';
               const index = state.orders.findIndex(order=>order.id===action.payload.id);
               state.orders[index] = action.payload;
           });
     }
})

export const {resetOrder} = orderSlice.actions;

export const selectCurrentOrder = (state)=>state.orders.currentOrder;
export const selectAllOrder = (state)=>state.orders.orders;
export const selectTotalOrder = (state)=>state.orders.totalOrders;
export const selectOrderStatus= (state)=>state.orders.status;

export default orderSlice.reducer;