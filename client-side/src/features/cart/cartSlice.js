import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, deleteItemFromCart, fetchItemsByUserId, resetCart, updateItem } from './cartAPI';

const initialState = {
   items:[],
   value:0,
   status:'loading',
   error:null,

};


// asynchronous action creator...
//add items to cart
export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    console.log("item 1 ",item);
    const response = await addToCart(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

//fetch users cart Items
export const fetchItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchItemsByUser',
  async (userId) => {
    console.log("userid ",userId);
    const response = await fetchItemsByUserId(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

// update Item in cart
export const updateItemAsync = createAsyncThunk(
  'cart/updateItem',
  async (update) => {
    console.log("Update data = ",update);
    const response = await updateItem(update);
    // The value we return becomes the `fulfilled` action payload
    console.log("Update data = ",response.data);
    return response.data;
  }
);

//deleteItem from cart...
export const deleteItemFromCartAsync = createAsyncThunk(
  'cart/deleteItemFromCart',
  async (itemId) => {
    const response = await deleteItemFromCart(itemId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

// reseting the cart..
export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async (userId) => {
    const response = await resetCart(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);





//reducer...
export const addToCartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.rejected, (state,action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(updateItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item=>item.id===action.payload.id)
        state.items[index]=action.payload;
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item=>item.id===action.payload.id);
        state.items.splice(index,1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = null;       
      });
  },
});




export const selectCartItems = (state) => state.cart.items;
export const selectCartItemStatus= (state) => state.cart.status;


export default addToCartSlice.reducer;
